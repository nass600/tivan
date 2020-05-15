import { AuthAction, SET_CONNECTION, SET_AVAILABLE_CONNECTIONS, REMOVE_AVAILABLE_CONNECTIONS } from '@actions'

export interface AuthConnectionState {
    name: string;
    token: string;
    uri: string;
    local: boolean;
    secure: boolean;
}

export interface AuthState {
    connection: AuthConnectionState | null;
    availableConnections: AuthConnectionState[];
}

const initialState = {
    connection: null,
    availableConnections: []
}

export const authReducer = (state: AuthState = initialState, action: AuthAction): AuthState => {
    switch (action.type) {
        case SET_CONNECTION:
            return {
                ...state,
                connection: action.payload
            }
        case SET_AVAILABLE_CONNECTIONS:
            return {
                ...state,
                connection: action.payload.find((connection: AuthConnectionState): boolean =>
                    connection.secure === true
                ) || action.payload[0],
                availableConnections: action.payload
            }
        case REMOVE_AVAILABLE_CONNECTIONS:
            return {
                ...state,
                connection: null,
                availableConnections: []
            }
        default:
            return state
    }
}
