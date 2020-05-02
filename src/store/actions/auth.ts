import { SET_CONNECTION, SET_AVAILABLE_CONNECTIONS, REMOVE_AVAILABLE_CONNECTIONS } from '@actions'
import { login, LoginResponse, getResources, Resource, Connection } from '@api'
import { ThunkDispatch, ThunkAction } from 'redux-thunk'
import { AnyAction } from 'redux'
import { AppState } from '@reducers'
import { AuthConnectionState } from '@reducers/auth'

export interface SetConnectionAction {
    type: 'SET_CONNECTION';
    payload: AuthConnectionState;
}

export interface SetAvailableConnectionsAction {
    type: 'SET_AVAILABLE_CONNECTIONS';
    payload: AuthConnectionState[];
}

export interface RemoveAvailableConnectionsAction {
    type: 'REMOVE_AVAILABLE_CONNECTIONS';
    payload: null;
}

export type AuthAction = SetConnectionAction | SetAvailableConnectionsAction | RemoveAvailableConnectionsAction;

export const setConnectionAction = (connection: AuthConnectionState): SetConnectionAction => (
    { type: SET_CONNECTION, payload: connection }
)

export const setAvailableConnectionsAction = (connections: AuthConnectionState[]): SetAvailableConnectionsAction => (
    { type: SET_AVAILABLE_CONNECTIONS, payload: connections }
)

export const removeAvailableConnectionsAction = (): RemoveAvailableConnectionsAction => (
    { type: REMOVE_AVAILABLE_CONNECTIONS, payload: null }
)

const buildConnections = (resources: Resource[]): AuthConnectionState[] => {
    const connections: AuthConnectionState[] = []

    resources.forEach((resource: Resource) => {
        resource.connections.forEach((connection: Connection): void => {
            if (resource.accessToken) {
                connections.push({
                    name: resource.name,
                    token: resource.accessToken,
                    uri: connection.uri,
                    local: connection.local,
                    secure: connection.protocol === 'https'
                })
            }
        })
    })

    return connections
}

export const authenticateAction = (
    username: string,
    password: string
): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
    async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => AppState): Promise<void> => {
        const state = getState()

        if (state.auth.connection) {
            return Promise.resolve()
        }

        return login(username, password, state.auth.clientId).then((token: LoginResponse) => {
            if (!token) {
                return Promise.reject(new Error('Login request didn\'t carry a valid token'))
            }

            return getResources(token, state.auth.clientId)
        }).then((data: Resource[]) => {
            dispatch({
                type: SET_AVAILABLE_CONNECTIONS,
                payload: buildConnections(data)
            })
        }).catch((e: Error) => {
            console.log('error', e)
            // dispatch(setErrors(['Unable to connect with Plex Server. Invalid Plex credentials.']))
        })
    }
