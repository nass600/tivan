import { SAVE_TOKEN, AuthAction } from '@actions'

export interface AuthState {
    token: string | null;
}

const initialState = {
    token: null
}

export const authReducer = (state: AuthState = initialState, action: AuthAction): AuthState => {
    switch (action.type) {
        case SAVE_TOKEN:
            return {
                ...state,
                token: action.payload
            }
        default:
            return state
    }
}
