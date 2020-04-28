import { combineReducers } from 'redux'
import { statusReducer, IStatusState } from './status'

export interface IAppState {
    status: IStatusState;
}

export default combineReducers<IAppState>({
    status: statusReducer
})
