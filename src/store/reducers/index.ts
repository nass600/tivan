import { combineReducers } from 'redux'
import { statusReducer, StatusState } from './status'
import { authReducer, AuthState } from './auth'

export interface AppState {
    auth: AuthState;
    status: StatusState;
}

export default combineReducers<AppState>({
    auth: authReducer,
    status: statusReducer
})
