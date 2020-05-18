import { combineReducers } from 'redux'
import { statusReducer, StatusState } from './status'
import { authReducer, AuthState } from './auth'
import { statsReducer, StatsState } from './stats'

export interface AppState {
    auth: AuthState;
    status: StatusState;
    stats: StatsState;
}

export default combineReducers<AppState>({
    auth: authReducer,
    status: statusReducer,
    stats: statsReducer
})
