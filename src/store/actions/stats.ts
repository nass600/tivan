import { RESET_STATS, ADD_STATS } from '@actions'
import { StatsState } from '@reducers/stats'

export interface ResetStatsAction {
    type: 'RESET_STATS';
    payload: null;
}

export interface AddStatsAction {
    type: 'ADD_STATS';
    payload: StatsState;
}

export type StatsAction = AddStatsAction | ResetStatsAction

export const addStatsAction = (data: StatsState): AddStatsAction => (
    { type: ADD_STATS, payload: data }
)

export const resetStatsVideoResolutionAction = (): ResetStatsAction => (
    { type: RESET_STATS, payload: null }
)
