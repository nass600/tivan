import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Store, applyMiddleware } from 'webext-redux'
import thunkMiddleware from 'redux-thunk'
import { waitForElement } from '../utils/dom'
import App from './components/App'
import Button from './components/Button'

const proxyStore = new Store({ portName: 'tivan' })
const middleware = [thunkMiddleware]
const store = applyMiddleware(proxyStore, ...middleware)

const CONTAINER_SELECTOR = '[class^="Page-page"]'
const NAVBAR_MENU_SELECTOR = '[class^="NavBar-right"]'

const app = document.createElement('div')
app.id = 'app'
const button = document.createElement('div')
button.id = 'button'

waitForElement(CONTAINER_SELECTOR).then(element => {
    document.querySelector(NAVBAR_MENU_SELECTOR).prepend(button)
    document.querySelector(CONTAINER_SELECTOR).prepend(app)

    render(
        <Provider store={store}>
            <Button/>
        </Provider>,
        document.getElementById('button')
    )

    store.ready().then(() => {
        render(
            <Provider store={store}>
                <App/>
            </Provider>,
            document.getElementById('app'))
    })
})
