import {
    AllSectionItemsResponse,
    Stream,
    StreamType,
    MetadataInfo,
    GetMetadataResponse,
    VideoResolution,
    AudioCodec,
    SubtitleCodec,
    FileContainer
} from '@api'
import { ThunkDispatch, ThunkAction } from 'redux-thunk'
import { AnyAction } from 'redux'
import { AppState } from '@reducers'
import BPromise from 'bluebird'
import _ from 'lodash'
import { plex } from '@sdk'
import { formatShort, formatSize } from '@utils/name-formatter'
import {
    ADD_MEDIA_ITEMS,
    ADD_STATS,
    ADD_NON_NORMALIZED_ITEMS,
    RESET_LIBRARY,
    RESET_STATS,
    RESET_NORMALIZATION
} from '@actions'
import { MediaState, StatsState } from '@reducers/library'

export interface AddMediaItemsAction {
    type: 'ADD_MEDIA_ITEMS';
    payload: { library: number; items: MediaState[] };
}

export interface AddNonNormalizedItemsAction {
    type: 'ADD_NON_NORMALIZED_ITEMS';
    payload: { library: number; items: MediaState[] };
}

export interface AddStatsAction {
    type: 'ADD_STATS';
    payload: { library: number; stats: StatsState };
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
    AddMediaItemsAction |
    AddStatsAction |
    AddNonNormalizedItemsAction |
    ResetLibraryAction |
    ResetStatsAction |
    ResetNormalizationAction;

export const addMediaItemsAction = (library: number, items: MediaState[]): AddMediaItemsAction => (
    { type: ADD_MEDIA_ITEMS, payload: { library, items } }
)

export const addStatsAction = (library: number, stats: StatsState): AddStatsAction => (
    { type: ADD_STATS, payload: { library, stats } }
)

export const addNonNormalizedItemsAction = (library: number, items: MediaState[]): AddNonNormalizedItemsAction => (
    { type: ADD_NON_NORMALIZED_ITEMS, payload: { library, items } }
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
        normalizationErrors: []
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

const extractStats = (items: MediaState[]): StatsState => {
    const data: StatsState = {
        videoCodec: { total: 0, items: {} },
        videoResolution: { total: 0, items: {} },
        audioCodec: { total: 0, items: {} },
        audioLanguage: { total: 0, items: {} },
        subtitleCodec: { total: 0, items: {} },
        subtitleLanguage: { total: 0, items: {} }
    }

    items.forEach((item: MediaState) => {
        const path = data.videoResolution
        const key: string = item.videoResolution
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

const extractNormalized = (items: MediaState[]): MediaState[] => {
    return items.filter((item: MediaState) => {
        if (![VideoResolution.FHD_1080, VideoResolution.UHD_4K].includes(item.videoResolution)) {
            item.normalizationErrors.push(`Video resolution is "${formatShort(item.videoResolution)}"`)
        }

        if (item.fileType !== FileContainer.MKV) {
            item.normalizationErrors.push(`File type is ".${item.fileType}"`)
        }

        if (item.size > 7516192768) {
            item.normalizationErrors.push(`File size is "${formatSize(item.size)}"`)
        }

        item.tracks.forEach((stream: Stream, index: number) => {
            // if (stream.streamType === StreamType.VIDEO) {
            //     if (stream.languageCode !== 'und') {
            //         item.normalizationErrors.push('Video track has language assigned')
            //     }
            // }

            if (stream.streamType === StreamType.AUDIO) {
                if (stream.codec !== AudioCodec.AC3) {
                    item.normalizationErrors.push(
                        `Audio track [${stream.index}] is encoded in ${formatShort(stream.codec)}`
                    )
                }
            }

            if (stream.streamType === StreamType.SUBTITLE) {
                if (stream.codec !== SubtitleCodec.SRT) {
                    item.normalizationErrors.push(
                        `Subtitle track [${stream.index}] is encoded in ${formatShort(stream.codec)}`
                    )
                }
            }
        })

        if (item.normalizationErrors.length > 0) {
            return true
        }
    })
}

// const extractStats = (items: MetadataInfo[]): StatsState => {
//     const data: StatsState = _.cloneDeep(initialState)

//     items.forEach((item: MetadataInfo) => {
//         const streams = item.Media[0].Part[0].Stream

//         const path = data.video.resolution
//         const key: string = [
//             VideoResolution.SD,
//             VideoResolution.SD_576,
//             VideoResolution.SD_480
//         ].includes(item.Media[0].videoResolution) ? VideoResolution.SD : item.Media[0].videoResolution
//         path.items[key] ? path.items[key]++ : path.items[key] = 1
//         path.total++
//         const summary: {[index: string]: string[]} = {
//             'video.codec': [],
//             'audio.codec': [],
//             'audio.language': [],
//             'subtitle.codec': [],
//             'subtitle.language': []
//         }

//         streams.forEach((stream: Stream) => {
//             let type = ''

//             if (stream.streamType === StreamType.VIDEO) {
//                 type = 'video'
//             } else if (stream.streamType === StreamType.AUDIO) {
//                 type = 'audio'
//             } else if (stream.streamType === StreamType.SUBTITLE) {
//                 type = 'subtitle'
//             }

//             summary[`${type}.codec`] = _.uniq(_.concat(summary[`${type}.codec`], stream.codec))

//             if (summary[`${type}.language`]) {
//                 summary[`${type}.language`] = _.uniq(_.concat(summary[`${type}.language`], stream.languageCode))
//             }
//         })

//         Object.keys(summary).map((stream) => {
//             const [streamType, prop] = stream.split('.')
//             const path = data[streamType][prop]
//             summary[stream].map((value: string) => {
//                 path.items[value] ? path.items[value]++ : path.items[value] = 1
//             })
//             path.total = path.total + summary[stream].length
//         })
//     })

//     return data
// }

export const parseLibraryAction = (): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
    async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => AppState): Promise<void> => {
        const state = getState()

        if (!state.auth.connection) {
            return Promise.reject(new Error('No token'))
        }

        plex.setBaseUrl(state.auth.connection.uri)
        plex.setAuthorization(state.auth.connection.token)

        plex.pms.sections.allSectionItems(2).then(async (data: AllSectionItemsResponse) => {
            const ids = data.MediaContainer.Metadata.map(item => item.ratingKey).slice(0, 199)

            // dispatch(resetStatsAction(2))
            // dispatch(resetNormaAction(2))
            dispatch(resetLibraryAction(2))

            const chunks = chunk(ids)

            for (const chunk of chunks) {
                await BPromise.map(
                    chunk,
                    (items) => plex.pms.metadata.get(items),
                    { concurrency: MAX_SIMULTANEOUS_DOWNLOADS }
                ).then((result: GetMetadataResponse[]) => {
                    const items = result.reduce((acc: [], item: GetMetadataResponse) => {
                        return acc.concat(item.MediaContainer.Metadata as [])
                    }, [])

                    const mappedItems = items.map(mapMedia)
                    dispatch(addStatsAction(2, extractStats(mappedItems)))
                    dispatch(addNonNormalizedItemsAction(2, extractNormalized(mappedItems)))
                })
            }
        })
    }
