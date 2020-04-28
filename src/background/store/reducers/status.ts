import { TOGGLE_DISPLAY, StatusAction } from '@actions'

export interface IStatusState {
    display: boolean;
}

const initialState = {
    display: false
}

export const statusReducer = (state: IStatusState = initialState, action: StatusAction): IStatusState => {
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
