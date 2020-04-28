import { TOGGLE_DISPLAY } from '@actions'

export interface IToggleDisplayAction {
    type: 'TOGGLE_DISPLAY';
    payload: null;
}

export type StatusAction = IToggleDisplayAction;

export const toggleDisplay = (): IToggleDisplayAction => (
    { type: TOGGLE_DISPLAY, payload: null}
)

// export const toggleDisplay = (): ActionPromise<IToggleDisplayAction> => (
//     async (dispatch: ActionDispatch): ActionPromise<IToggleDisplayAction> => (
//         dispatch({
//             type: TOGGLE_DISPLAY,
//             payload: null
//         })
//     )
// )
