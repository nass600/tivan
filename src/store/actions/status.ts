import { TOGGLE_DISPLAY } from '@actions'

export interface ToggleDisplayAction {
    type: 'TOGGLE_DISPLAY';
    payload?: boolean;
}

export type StatusAction = ToggleDisplayAction;

export const toggleDisplay = (display?: boolean): ToggleDisplayAction => (
    { type: TOGGLE_DISPLAY, payload: display }
)
