import { TOGGLE_DISPLAY } from './action-types'

export const toggleDisplay = () => dispatch => {
    dispatch({
        type: TOGGLE_DISPLAY,
        payload: null
    })
}
