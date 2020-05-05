import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Popup } from '@containers'
import store from '@store/createStore'

store.ready().then(() => {
    render(
        <Provider store={store}>
            <Popup />
        </Provider>,
        document.getElementById('app')
    )
})
