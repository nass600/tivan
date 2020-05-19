import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { waitForElement } from '@utils/dom'
import { NavbarItem } from '@containers'
import store from '@store/createStore'

const CONTAINER_SELECTOR = '[class^="Page-page"]'
const NAVBAR_MENU_SELECTOR = '[class^="NavBar-right"]'

const button = document.createElement('div')
button.id = 'tivan-button'

waitForElement(CONTAINER_SELECTOR).then((): void => {
    const navbarMenu = document.querySelector(NAVBAR_MENU_SELECTOR)

    if (!navbarMenu) {
        throw new Error('Navbar menu not found')
        return
    }

    navbarMenu.prepend(button)

    store.ready().then(() => {
        render(
            <Provider store={store}>
                <NavbarItem />
            </Provider>,
            document.getElementById('tivan-button')
        )
    })
})
