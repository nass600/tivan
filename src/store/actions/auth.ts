import { SET_CONNECTION, SET_AVAILABLE_CONNECTIONS, REMOVE_AVAILABLE_CONNECTIONS } from '@actions'
import { Resource, Connection, User } from '@api'
import { ThunkDispatch, ThunkAction } from 'redux-thunk'
import { AnyAction } from 'redux'
import { AppState } from '@reducers'
import { AuthConnectionState } from '@reducers/auth'
import { plex } from '@sdk'

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

export const authenticateAction = (username: string, password: string): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
    async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => AppState): Promise<void> => {
        const state = getState()

        if (state.auth.connection) {
            return Promise.resolve()
        }

        return plex.tv.users.signIn(username, password).then((user: User) => {
            if (!user.authToken) {
                return Promise.reject(new Error('Login request didn\'t carry a valid token'))
            }

            plex.setAuthorization(user.authToken)

            return plex.tv.resources.all()
        }).then((data: Resource[]) => {
            dispatch(setAvailableConnectionsAction(buildConnections(data)))
        })
    }

export const logoutAction = (): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
    async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => AppState): Promise<void> => {
        const state = getState()

        if (!state.auth.connection) {
            return Promise.resolve()
        }

        plex.setAuthorization(state.auth.connection.token)

        return plex.tv.users.signOut().then(() => {
            dispatch(removeAvailableConnectionsAction())
        })
    }
