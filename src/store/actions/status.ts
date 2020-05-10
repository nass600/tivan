import { TOGGLE_DISPLAY, TOGGLE_TAB } from '@actions'
import { Tabs } from '@reducers/status'

export interface ToggleDisplayAction {
    type: 'TOGGLE_DISPLAY';
    payload?: boolean;
}
export interface ToggleTabAction {
    type: 'TOGGLE_TAB';
    payload: Tabs;
}

export type StatusAction = ToggleDisplayAction | ToggleTabAction;

export const toggleDisplayAction = (display?: boolean): ToggleDisplayAction => (
    { type: TOGGLE_DISPLAY, payload: display }
)

export const toggleTabAction = (tab: Tabs): ToggleTabAction => (
    { type: TOGGLE_TAB, payload: tab }
)
