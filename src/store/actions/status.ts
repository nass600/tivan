import { TOGGLE_DISPLAY, SET_CURRENT_TAB, SET_LOADING, SET_CURRENT_LIBRARY, parseLibraryAction } from '@actions'
import { Tabs, LoadingState } from '@reducers/status'
import { ThunkDispatch, ThunkAction } from 'redux-thunk'
import { AnyAction } from 'redux'
import { AppState } from '@reducers'
import _ from 'lodash'

export interface ToggleDisplayAction {
    type: 'TOGGLE_DISPLAY';
    payload?: boolean;
}
export interface ToggleTabAction {
    type: 'SET_CURRENT_TAB';
    payload: Tabs;
}

export interface SetLoadingAction {
    type: 'SET_LOADING';
    payload: LoadingState;
}

export interface SetCurrentLibraryAction {
    type: 'SET_CURRENT_LIBRARY';
    payload: number;
}

export type StatusAction = ToggleDisplayAction | ToggleTabAction | SetLoadingAction | SetCurrentLibraryAction;

export const toggleDisplayAction = (display?: boolean): ToggleDisplayAction => (
    { type: TOGGLE_DISPLAY, payload: display }
)

export const toggleTabAction = (tab: Tabs): ToggleTabAction => (
    { type: SET_CURRENT_TAB, payload: tab }
)

export const setLoadingAction = (data: LoadingState): SetLoadingAction => (
    { type: SET_LOADING, payload: data }
)

export const setCurrentLibraryAction = (libraryId: number): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
    async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => AppState): Promise<void> => {
        const state = getState()

        if (!libraryId) {
            return Promise.reject(new Error('No library id provided'))
        }

        dispatch({ type: SET_CURRENT_LIBRARY, payload: libraryId })

        if (_.isEmpty(state.library[libraryId]?.stats)) {
            dispatch(parseLibraryAction(libraryId))
        }
    }
