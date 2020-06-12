import { TOGGLE_DISPLAY, SET_CURRENT_TAB, SET_LOADING, StatusAction, SET_CURRENT_LIBRARY, SET_ERROR } from '@actions'

export enum Tabs {
    STATS = 'STATS',
    NORMALIZATION = 'NORMALIZATION',
    FORECAST = 'FORECAST'
}

export interface LoadingState {
    library: boolean;
}

export interface ErrorState {
    message: string;
    code: number;
}
export interface StatusState {
    display: boolean;
    currentTab: Tabs;
    currentLibrary: number | null;
    loading: LoadingState;
    error: ErrorState | null;
}

const initialState = {
    display: false,
    currentTab: Tabs.STATS,
    currentLibrary: null,
    loading: {
        library: false
    },
    error: null
}

export const statusReducer = (state: StatusState = initialState, action: StatusAction): StatusState => {
    switch (action.type) {
        case SET_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case TOGGLE_DISPLAY:
            return {
                ...state,
                display: action.payload !== undefined ? action.payload : !state.display
            }
        case SET_CURRENT_TAB:
            return {
                ...state,
                currentTab: action.payload
            }
        case SET_LOADING:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    ...action.payload
                }
            }
        case SET_CURRENT_LIBRARY:
            return {
                ...state,
                currentLibrary: action.payload
            }
        default:
            return state
    }
}
