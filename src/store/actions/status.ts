import { TOGGLE_DISPLAY } from '@actions'

export interface ToggleDisplayAction {
    type: 'TOGGLE_DISPLAY';
    payload: null;
}

export type StatusAction = ToggleDisplayAction;

export const toggleDisplay = (): ToggleDisplayAction => (
    { type: TOGGLE_DISPLAY, payload: null }
)
