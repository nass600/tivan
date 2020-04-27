import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Store, applyMiddleware } from 'webext-redux'
import thunkMiddleware from 'redux-thunk'
import App from './components/App'

const proxyStore = new Store({ portName: 'tivan' })
const middleware = [thunkMiddleware]
const store = applyMiddleware(proxyStore, ...middleware)

store.ready().then(() => {
    render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('app'))
})
