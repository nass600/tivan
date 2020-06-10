import {
    RESET_STATS,
    RESET_NORMALIZATION,
    ADD_STATS,
    ADD_NON_NORMALIZED_ITEMS,
    UPDATE_LIBRARY_INFO,
    LibraryAction,
    SET_LIBRARIES,
    RESET_LIBRARY
} from '@actions'
import _ from 'lodash'
import { Stream, VideoResolution, FileContainer, SectionType } from '@api'

export interface StatsDataItemsState {
    [key: string]: number;
}

export interface StatsDataState {
    total: number;
    items: StatsDataItemsState;
}

export interface MediaState {
    // eslint-disable-next-line
    [x: string]: any;
    id: string;
    title: string;
    year: number;
    fileType: FileContainer;
    duration: number;
    size: number;
    videoResolution: VideoResolution;
    videoCodec: string[];
    audioCodec: string[];
    audioLanguage: string[];
    subtitleCodec: string[];
    subtitleLanguage: string[];
    tracks: Stream[];
    errors: string[];
}

export enum StatsType {
    VIDEO_CODEC = 'videoCodec',
    VIDEO_RESOLUTION = 'videoResolution',
    AUDIO_CODEC = 'audioCodec',
    AUDIO_LANGUAGE = 'audioLanguage',
    SUBTITLE_CODEC = 'subtitleCodec',
    SUBTITLE_LANGUAGE = 'subtitleLanguage',
    NORMALIZATION = 'normalization'
}

export interface StatsState {
    [id: string]: StatsDataState;
}

export interface LibraryState {
    title: string;
    type: SectionType;
    totalItems?: number;
    stats: StatsState;
    normalization: MediaState[];
}

export interface LibrariesState {
    [libraryId: number]: LibraryState;
}

export const initialState = {}

export const libraryReducer = (state: LibrariesState = initialState, action: LibraryAction): LibrariesState => {
    switch (action.type) {
        case SET_LIBRARIES:
            return Object.keys(action.payload).reduce((acc: LibrariesState, libraryId: string) => {
                const id = parseInt(libraryId)
                acc[id] = _.merge({}, state[id], action.payload[id])

                return acc
            }, {})
        case RESET_LIBRARY:
            return {
                ...state,
                [action.payload]: {
                    ...state[action.payload],
                    stats: {},
                    normalization: []
                }
            }
        case RESET_STATS:
            return {
                ...state,
                [action.payload]: {
                    ...state[action.payload],
                    stats: {}
                }
            }
        case RESET_NORMALIZATION:
            return {
                ...state,
                [action.payload]: {
                    ...state[action.payload],
                    normalization: []
                }
            }
        case ADD_STATS:
            return {
                ...state,
                [action.payload.library]: {
                    ...state[action.payload.library],
                    stats: _.mergeWith({}, state[action.payload.library].stats, action.payload.stats, (a, b) => {
                        if (_.isNumber(a) && _.isNumber(b)) {
                            return a + b
                        }
                    })
                }
            }
        case ADD_NON_NORMALIZED_ITEMS: {
            const normalization = state[action.payload.library].normalization || []

            return {
                ...state,
                [action.payload.library]: {
                    ...state[action.payload.library],
                    normalization: normalization.concat(action.payload.items)
                }
            }
        }
        case UPDATE_LIBRARY_INFO:
            return {
                ...state,
                [action.payload.library]: _.merge({}, state[action.payload.library], action.payload.info)
            }
        default:
            return state
    }
}
