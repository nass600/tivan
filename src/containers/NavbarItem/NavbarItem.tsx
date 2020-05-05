import React, { Component } from 'react'
import { connect, Provider } from 'react-redux'
import { toggleDisplay } from '@actions'
import { render } from 'react-dom'
import store from '@store/createStore'
import { Content } from '@containers'

interface NavbarItemDispatchProps {
    toggleDisplay(display?: boolean): void;
}

const CONTAINER_SELECTOR = '[class^="Page-page"]'

class NavbarItem extends Component<NavbarItemDispatchProps> {
    createContentContainer = (): void => {
        const app = document.createElement('div')
        app.id = 'tivan'
        const container = document.querySelector(CONTAINER_SELECTOR)

        if (!container) {
            return
        }

        container.prepend(app)

        render(
            <Provider store={store}>
                <Content />
            </Provider>,
            document.getElementById('tivan')
        )
    }

    handleClick = (event: React.MouseEvent<HTMLAnchorElement>): void => {
        event.preventDefault()
        this.props.toggleDisplay()

        if (!document.querySelector('#tivan')) {
            this.createContentContainer()
        }
    }

    render (): React.ReactNode {
        return (
            <a href="#" onClick={this.handleClick}>
                NavbarItem
            </a>
        )
    }
}

const mapDispatchToProps: NavbarItemDispatchProps = {
    toggleDisplay
}

export default connect<{}, NavbarItemDispatchProps>(null, mapDispatchToProps)(NavbarItem)
