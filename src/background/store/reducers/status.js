import { TOGGLE_DISPLAY } from '../actions/action-types'

const initialState = {
    display: false
}

export default (state = initialState, action) => {
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
