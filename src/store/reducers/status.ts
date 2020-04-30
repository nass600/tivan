import { TOGGLE_DISPLAY, StatusAction } from '@actions'

export interface StatusState {
    display: boolean;
}

const initialState = {
    display: false
}

export const statusReducer = (state: StatusState = initialState, action: StatusAction): StatusState => {
    switch (action.type) {
        case TOGGLE_DISPLAY:
            return {
                ...state,
                display: !state.display
            }
        default:
            return state
    }
}
