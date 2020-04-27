import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import { composeWithDevTools } from 'remote-redux-devtools'
import { persistStore, persistReducer } from 'redux-persist'
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

export default () => {
    const store = createStore(
        persistedReducer,
        composeEnhancers(
            applyMiddleware(thunk)
        )
    )
    const persistor = persistStore(store)

    return { store, persistor }
}
