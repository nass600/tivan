import {
    AllSectionItemsResponse,
    AllSectionsResponse,
    Stream,
    StreamType,
    MetadataInfo,
    GetMetadataResponse,
    VideoResolution,
    AudioCodec,
    SubtitleCodec,
    FileContainer,
    Directory,
    SectionType
} from '@api'
import { ThunkDispatch, ThunkAction } from 'redux-thunk'
import { AnyAction } from 'redux'
import { AppState } from '@reducers'
import BPromise from 'bluebird'
import _ from 'lodash'
import { plex } from '@sdk'
import { formatShort, formatSize } from '@utils/name-formatter'
import {
    UPDATE_LIBRARY_INFO,
    ADD_STATS,
    ADD_NON_NORMALIZED_ITEMS,
    CLEAN_LIBRARIES,
    SET_LIBRARIES,
    RESET_LIBRARY,
    RESET_STATS,
    RESET_NORMALIZATION,
    setLoadingAction,
    setCurrentLibraryAction
} from '@actions'
import { MediaState, StatsState, LibrariesState, LibraryState } from '@reducers/library'
import { getCurrentLibrary } from '@selectors'
import { setErrorAction } from './status'
import { AxiosError } from 'axios'
import { removeAvailableConnectionsAction } from './auth'

export interface UpdatelibraryInfoAction {
    type: 'UPDATE_LIBRARY_INFO';
    payload: { library: number; info: Pick<LibraryState, 'totalItems'> };
}

export interface AddNonNormalizedItemsAction {
    type: 'ADD_NON_NORMALIZED_ITEMS';
    payload: { library: number; items: MediaState[] };
}

export interface AddStatsAction {
    type: 'ADD_STATS';
    payload: { library: number; stats: StatsState };
}

export interface CleanLibrariesAction {
    type: 'CLEAN_LIBRARIES';
    payload: null;
}

export interface SetLibrariesAction {
    type: 'SET_LIBRARIES';
    payload: LibrariesState;
}

export interface ResetLibraryAction {
    type: 'RESET_LIBRARY';
    payload: number;
}

export interface ResetStatsAction {
    type: 'RESET_STATS';
    payload: number;
}

export interface ResetNormalizationAction {
    type: 'RESET_NORMALIZATION';
    payload: number;
}

export type LibraryAction =
UpdatelibraryInfoAction |
AddStatsAction |
AddNonNormalizedItemsAction |
CleanLibrariesAction |
SetLibrariesAction |
ResetLibraryAction |
ResetStatsAction |
ResetNormalizationAction;

export const updateLibraryInfoAction = (
    library: number,
    info: Pick<LibraryState, 'totalItems'>
): UpdatelibraryInfoAction => (
    { type: UPDATE_LIBRARY_INFO, payload: { library, info } }
)

export const addStatsAction = (library: number, stats: StatsState): AddStatsAction => (
    { type: ADD_STATS, payload: { library, stats } }
)

export const addNonNormalizedItemsAction = (library: number, items: MediaState[]): AddNonNormalizedItemsAction => (
    { type: ADD_NON_NORMALIZED_ITEMS, payload: { library, items } }
)

export const cleanLibrariesAction = (): CleanLibrariesAction => (
    { type: CLEAN_LIBRARIES, payload: null }
)

export const setLibrariesAction = (libraries: LibrariesState): SetLibrariesAction => (
    { type: SET_LIBRARIES, payload: libraries }
)

export const resetLibraryAction = (library: number): ResetLibraryAction => (
    { type: RESET_LIBRARY, payload: library }
)

export const resetStatsAction = (library: number): ResetStatsAction => (
    { type: RESET_STATS, payload: library }
)

export const resetNormalizationAction = (library: number): ResetNormalizationAction => (
    { type: RESET_NORMALIZATION, payload: library }
)

const MAX_SIMULTANEOUS_DOWNLOADS = 30

const chunk = (ids: string[]): string[][][] => {
    let chunks = []

    if (ids.length > 500) {
        chunks = _.chunk(ids, 200)
    } else {
        chunks = [ids]
    }

    chunks = chunks.map((chunk) => {
        return _.chunk(chunk, 40)
    })

    return chunks
}

const mapMedia = (item: MetadataInfo): MediaState => {
    const streams = item.Media[0].Part[0].Stream
    const data: MediaState = {
        id: item.ratingKey,
        title: item.title,
        year: item.year,
        fileType: item.Media[0].container,
        duration: item.Media[0].duration,
        size: item.Media[0].Part[0].size,
        videoResolution: [
            VideoResolution.SD,
            VideoResolution.SD_576,
            VideoResolution.SD_480
        ].includes(item.Media[0].videoResolution) ? VideoResolution.SD : item.Media[0].videoResolution,
        videoCodec: [],
        audioCodec: [],
        audioLanguage: [],
        subtitleCodec: [],
        subtitleLanguage: [],
        tracks: streams,
        errors: []
    }

    streams.forEach((stream: Stream) => {
        if (stream.streamType === StreamType.VIDEO) {
            data.videoCodec = _.uniq(_.concat(data.videoCodec, stream.codec))
        } else if (stream.streamType === StreamType.AUDIO) {
            data.audioCodec = _.uniq(_.concat(data.audioCodec, stream.codec))
            data.audioLanguage = _.uniq(_.concat(data.audioLanguage, stream.languageCode))
        } else if (stream.streamType === StreamType.SUBTITLE) {
            data.subtitleCodec = _.uniq(_.concat(data.subtitleCodec, stream.codec))
            data.subtitleLanguage = _.uniq(_.concat(data.subtitleLanguage, stream.languageCode))
        }
    })

    return data
}

/**
 * Calculates if the given item is normalized.
 *
 * @param {MediaState} item
 */
const isNormalized = (item: MediaState): boolean => {
    if (![VideoResolution.FHD_1080, VideoResolution.UHD_4K].includes(item.videoResolution)) {
        item.errors.push(`Video resolution is ${formatShort(item.videoResolution)}`)
    }

    if (item.fileType !== FileContainer.MKV) {
        item.errors.push(`File type is .${item.fileType}`)
    }

    if (item.size > 7516192768) {
        item.errors.push(`File size is ${formatSize(item.size)}`)
    }

    item.tracks.forEach((stream: Stream) => {
        if (stream.streamType === StreamType.AUDIO) {
            if (stream.codec !== AudioCodec.AC3) {
                item.errors.push(
                    `Audio track [${stream.index}] is encoded in ${formatShort(stream.codec)}`
                )
            }
        }

        if (stream.streamType === StreamType.SUBTITLE) {
            if (stream.codec !== SubtitleCodec.SRT) {
                item.errors.push(
                    `Subtitle track [${stream.index}] is encoded in ${formatShort(stream.codec)}`
                )
            }
        }
    })

    return item.errors.length === 0
}

const extractNonNormalized = (items: MediaState[]): MediaState[] => {
    return items.filter((item: MediaState) => !isNormalized(item))
}

/**
 * Calulates the stats out of the given ollection of items.
 *
 * @param {MediaState[]} items
 */
const extractStats = (items: MediaState[]): StatsState => {
    const data: StatsState = {
        videoCodec: { total: 0, items: {} },
        videoResolution: { total: 0, items: {} },
        audioCodec: { total: 0, items: {} },
        audioLanguage: { total: 0, items: {} },
        subtitleCodec: { total: 0, items: {} },
        subtitleLanguage: { total: 0, items: {} },
        normalization: { total: 0, items: {} }
    }

    items.forEach((item: MediaState) => {
        let path = data.videoResolution
        let key: string = item.videoResolution
        path.items[key] ? path.items[key]++ : path.items[key] = 1
        path.total++

        path = data.normalization
        key = item.errors && item.errors.length > 0 ? 'non-normalized' : 'normalized'
        path.items[key] ? path.items[key]++ : path.items[key] = 1
        path.total++

        ['videoCodec', 'audioCodec', 'audioLanguage', 'subtitleCodec', 'subtitleLanguage'].map((prop: string) => {
            const path = data[prop]
            item[prop].map((value: string) => {
                path.items[value] ? path.items[value]++ : path.items[value] = 1
            })
            path.total = path.total + item[prop].length
        })
    })

    return data
}

/**
 * Fetches the details of all the items included in the given library if a connection exists.
 * Given the number of items might be high the list is chunked so it is more performant.
 * All the stats and normalization will be executed per chunk.
 *
 * @param {number} libraryId - PMS Library identifier
 */
export const parseLibraryAction = (libraryId: number): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
    async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => AppState): Promise<void> => {
        const state = getState()

        if (!state.auth.connection) {
            dispatch(setErrorAction({ message: 'Missing token while requesting "parseLibrary"', code: 401 }))
            return Promise.resolve()
        }

        dispatch(setLoadingAction({ library: true }))

        plex.setBaseUrl(state.auth.connection.uri)
        plex.setAuthorization(state.auth.connection.token)

        plex.pms.sections.allSectionItems(libraryId).then(async (data: AllSectionItemsResponse) => {
            const ids = data.MediaContainer.Metadata.map(item => item.ratingKey)

            dispatch(setErrorAction(null))
            dispatch(resetLibraryAction(libraryId))
            dispatch(updateLibraryInfoAction(libraryId, {
                totalItems: data.MediaContainer.size
            }))

            const chunks = chunk(ids)

            for (const chunk of chunks) {
                await BPromise.map(
                    chunk,
                    (items) => plex.pms.metadata.get(items),
                    { concurrency: MAX_SIMULTANEOUS_DOWNLOADS }
                ).then((result: GetMetadataResponse[]) => {
                    const items = result.reduce((acc: [], item: GetMetadataResponse) => {
                        return acc.concat(item.MediaContainer.Metadata as [])
                    }, []).map(mapMedia)

                    dispatch(addNonNormalizedItemsAction(libraryId, extractNonNormalized(items)))
                    dispatch(addStatsAction(libraryId, extractStats(items)))
                }).catch((e: Error): void => {
                    throw e
                })
            }
        }).catch((error: AxiosError): void => {
            if (error.response?.status === 401) {
                dispatch(removeAvailableConnectionsAction())
                dispatch(setErrorAction({ message: error.response.statusText, code: error.response.status }))
            } else if (error.response) {
                dispatch(setErrorAction({ message: error.response.statusText, code: error.response.status }))
            } else {
                dispatch(setErrorAction({ message: 'Something wrong happened', code: 500 }))
            }
        }).finally((): void => {
            dispatch(setLoadingAction({ library: false }))
        })
    }

const ALLOWED_LIBRARY_TYPES = [SectionType.MOVIE]

/**
 * Fetches libraries (sections) from Plex Media Server if a connection exists.
 * If no current library will trigger an action to set the first library as the current one.
 */
export const getLibrariesAction = (): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
    async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => AppState): Promise<void> => {
        const state = getState()

        if (!state.auth.connection) {
            dispatch(setErrorAction({ message: 'Missing token while requesting "getLibraries"', code: 401 }))
            return Promise.resolve()
        }

        plex.setBaseUrl(state.auth.connection.uri)
        plex.setAuthorization(state.auth.connection.token)
        dispatch(setLoadingAction({ library: false }))

        plex.pms.sections.all().then(async (data: AllSectionsResponse) => {
            const libraries = data.MediaContainer.Directory.reduce((acc: LibrariesState, directory: Directory) => {
                if (ALLOWED_LIBRARY_TYPES.includes(directory.type)) {
                    acc[directory.Location[0].id] = {
                        title: directory.title,
                        type: directory.type,
                        stats: {},
                        normalization: []
                    }
                }

                return acc
            }, {})

            dispatch(setErrorAction(null))
            dispatch(setLibrariesAction(libraries))

            const items = Object.keys(libraries)

            if (
                (state.status.currentLibrary === null && items.length > 0) ||
                _.isEmpty(getCurrentLibrary(state)?.stats)
            ) {
                dispatch(setCurrentLibraryAction(parseInt(items[0])))
            }
        }).catch((error: AxiosError): void => {
            if (error.response?.status === 401) {
                dispatch(removeAvailableConnectionsAction())
                dispatch(setErrorAction({ message: error.response.statusText, code: error.response.status }))
            } else if (error.response) {
                dispatch(setErrorAction({ message: error.response.statusText, code: error.response.status }))
            } else {
                dispatch(setErrorAction({ message: 'Something wrong happened', code: 500 }))
            }
        })
    }
