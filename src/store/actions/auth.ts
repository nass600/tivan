import { SAVE_TOKEN } from '@actions'
import { login, LoginResponse } from '@api'
import { ThunkDispatch, ThunkAction } from 'redux-thunk'
import { AnyAction } from 'redux'
import { AppState } from '@reducers'

export interface SaveTokenAction {
    type: 'SAVE_TOKEN';
    payload: string | null;
}

export type AuthAction = SaveTokenAction;

export const saveToken = (token: string): SaveTokenAction => (
    { type: SAVE_TOKEN, payload: token }
)

export const authenticate = (
    username: string,
    password: string
): ThunkAction<Promise<LoginResponse | void>, {}, {}, AnyAction> =>
    async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => AppState): Promise<LoginResponse | void> => {
        const state = getState()

        if (state.auth.token) {
            return Promise.resolve(state.auth.token)
        }

        return login(username, password).then((token: LoginResponse) => {
            dispatch({
                type: SAVE_TOKEN,
                payload: token
            })
        }).catch((e: Error) => {
            console.log('error', e)
            // dispatch(setErrors(['Unable to connect with Plex Server. Invalid Plex credentials.']))
        })
    }
