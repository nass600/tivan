import { RESET_STATS, ADD_STATS, StatsAction } from '@actions'
import _ from 'lodash'

export interface StatsDataItemsState {
    [key: string]: number;
}

export interface StatsDataState {
    total: number;
    items: StatsDataItemsState;
}

export interface StatsState {
    [id: string]: {
        [id: string]: StatsDataState;
    };
}

export const initialState = {
    video: {
        codec: { total: 0, items: {} },
        resolution: { total: 0, items: {} }
    },
    audio: {
        codec: { total: 0, items: {} },
        language: { total: 0, items: {} }
    },
    subtitle: {
        codec: { total: 0, items: {} },
        language: { total: 0, items: {} }
    }
}

export const statsReducer = (state: StatsState = initialState, action: StatsAction): StatsState => {
    switch (action.type) {
        case RESET_STATS:
            return initialState
        case ADD_STATS:
            return _.mergeWith({}, state, action.payload, (a, b) => {
                if (_.isNumber(a) && _.isNumber(b)) {
                    return a + b
                }
            })
        default:
            return state
    }
}
