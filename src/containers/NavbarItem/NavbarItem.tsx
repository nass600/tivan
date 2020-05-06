import React, { Component } from 'react'
import { connect, Provider } from 'react-redux'
import { toggleDisplay } from '@actions'
import { render } from 'react-dom'
import store from '@store/createStore'
import { NavbarButton, NavbarGlobalStyles } from '@styles'
import { Content } from '@containers'
import { IconContext } from 'react-icons'
import { BsPieChart, BsPieChartFill } from 'react-icons/bs'
import { AppState } from '@reducers'

interface NavbarItemDispatchProps {
    toggleDisplay(display?: boolean): void;
}

interface NavbarItemStateProps {
    display: boolean;
}

const CONTAINER_SELECTOR = '[class^="Page-page"]'

type NavbarItemProps = NavbarItemDispatchProps & NavbarItemStateProps

class NavbarItem extends Component<NavbarItemProps> {
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
                <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}/>
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
        const { display } = this.props

        return (
            <>
                <NavbarGlobalStyles/>
                <NavbarButton onClick={this.handleClick}>
                    <IconContext.Provider value={{ style: { width: '1em', height: '1em' } }}>
                        {display ? <BsPieChartFill /> : <BsPieChart />}
                    </IconContext.Provider>
                </NavbarButton>
            </>
        )
    }
}

const mapStateToProps = (state: AppState): NavbarItemStateProps => {
    return {
        display: state.status.display
    }
}

const mapDispatchToProps: NavbarItemDispatchProps = {
    toggleDisplay
}

export default connect<NavbarItemStateProps, NavbarItemDispatchProps>(mapStateToProps, mapDispatchToProps)(NavbarItem)
