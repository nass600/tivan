import { combineReducers } from 'redux'
import { statusReducer, StatusState } from './status'

export interface AppState {
    status: StatusState;
}

export default combineReducers<AppState>({
    status: statusReducer
})
