import { combineReducers } from 'redux'
import { statusReducer, StatusState } from './status'
import { authReducer, AuthState } from './auth'
import { libraryReducer, LibrariesState } from './library'

export interface AppState {
    auth: AuthState;
    status: StatusState;
    library: LibrariesState;
}

export default combineReducers<AppState>({
    auth: authReducer,
    status: statusReducer,
    library: libraryReducer
})
