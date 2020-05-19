import { TOGGLE_DISPLAY, TOGGLE_TAB, StatusAction } from '@actions'

export enum Tabs {
    STATS = 'STATS',
    NORMALIZATION = 'NORMALIZATION',
    FORECAST = 'FORECAST'
}

export interface StatusState {
    display: boolean;
    currentTab: Tabs;
}

const initialState = {
    display: false,
    currentTab: Tabs.STATS
}

export const statusReducer = (state: StatusState = initialState, action: StatusAction): StatusState => {
    switch (action.type) {
        case TOGGLE_DISPLAY:
            return {
                ...state,
                display: action.payload !== undefined ? action.payload : !state.display
            }
        case TOGGLE_TAB:
            return {
                ...state,
                currentTab: action.payload
            }
        default:
            return state
    }
}
