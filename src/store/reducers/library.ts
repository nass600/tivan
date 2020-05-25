import {
    RESET_STATS,
    RESET_NORMALIZATION,
    ADD_STATS,
    ADD_NON_NORMALIZED_ITEMS,
    ADD_MEDIA_ITEMS,
    LibraryAction,
    RESET_LIBRARY
} from '@actions'
import _ from 'lodash'
import { Stream, VideoResolution, FileContainer } from '@api'

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
    normalizationErrors: string[];
}

export interface StatsState {
    [id: string]: StatsDataState;
}

export interface LibraryState {
    [libraryId: number]: {
        stats: StatsState;
        normalization: MediaState[];
    };
}

export const initialState = {}

export const libraryReducer = (state: LibraryState = initialState, action: LibraryAction): LibraryState => {
    switch (action.type) {
        case RESET_LIBRARY:
            return {
                ...state,
                [action.payload]: {
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
        case ADD_MEDIA_ITEMS:
            return {
                ...state,
                [action.payload.library]: _.merge({}, state[action.payload.library], action.payload.items)
            }
        default:
            return state
    }
}
