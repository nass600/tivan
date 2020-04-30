import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Store, applyMiddleware } from 'webext-redux'
import thunkMiddleware from 'redux-thunk'
import { waitForElement } from '@utils/dom'
import { Content, NavbarItem } from '@containers'

const proxyStore = new Store({ portName: 'tivan' })
const middleware = [thunkMiddleware]
const store = applyMiddleware(proxyStore, ...middleware)

const CONTAINER_SELECTOR = '[class^="Page-page"]'
const NAVBAR_MENU_SELECTOR = '[class^="NavBar-right"]'

const app = document.createElement('div')
app.id = 'tivan'
const button = document.createElement('div')
button.id = 'button'

waitForElement(CONTAINER_SELECTOR).then((): void => {
    const navbarMenu = document.querySelector(NAVBAR_MENU_SELECTOR)
    const container = document.querySelector(CONTAINER_SELECTOR)

    if (!navbarMenu || !container) {
        return
    }

    navbarMenu.prepend(button)
    container.prepend(app)

    store.ready().then(() => {
        render(
            <Provider store={store}>
                <NavbarItem />
            </Provider>,
            document.getElementById('button')
        )
        render(
            <Provider store={store}>
                <Content />
            </Provider>,
            document.getElementById('tivan'))
    })
})
