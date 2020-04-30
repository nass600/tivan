import { createStore, applyMiddleware, Store } from 'redux'
import thunk from 'redux-thunk'
import rootReducer, { AppState } from './reducers'
import { composeWithDevTools } from 'remote-redux-devtools'
import { persistStore, persistReducer, Persistor } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const composeEnhancers = composeWithDevTools({
    hostname: 'localhost',
    realtime: true,
    port: 4000
})

const persistConfig = {
    key: 'tivan',
    storage
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

export default (): {store: Store<AppState>; persistor: Persistor} => {
    const store = createStore(
        persistedReducer,
        composeEnhancers(
            applyMiddleware(thunk)
        )
    )
    const persistor = persistStore(store)

    return { store, persistor }
}
