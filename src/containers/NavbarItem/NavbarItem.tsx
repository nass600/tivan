import React, { Component, AnchorHTMLAttributes } from 'react'
import { connect, Provider } from 'react-redux'
import { toggleDisplayAction } from '@actions'
import { render } from 'react-dom'
import store from '@store/createStore'
import { variables } from '@styles'
import { Content } from '@containers'
import { Tooltip, TooltipContainer } from '@components'
import { IconContext } from 'react-icons'
import { BsPieChart, BsPieChartFill } from 'react-icons/bs'
import { AppState } from '@reducers'
import styled, { createGlobalStyle } from 'styled-components'

const NavbarGlobalStyles = createGlobalStyle`
    #tivan-button {
        height: 100%;
    }
`

const NavbarButton = styled.a<AnchorHTMLAttributes<HTMLAnchorElement>>`
    position: relative;
    display: inline-flex;
    align-items: center;
    height: 100%;
    margin: 0;
    padding: 0 15px;
    color: ${variables.colors.gray20};
    font-size: 20px;
    text-align: inherit;
    text-decoration: none;
    background: none;
    border: 0;
    outline: none;
    cursor: pointer;
    transition: color 0.2s ease-in;
    user-select: none;
    touch-action: manipulation;

    &:hover {
        color: ${variables.colors.white};
    }
`

interface NavbarItemDispatchProps {
    toggleDisplayAction(display?: boolean): void;
}

interface NavbarItemStateProps {
    display: boolean;
}

const CONTAINER_SELECTOR = '#content [class^="FullPage-container"]'

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
        this.props.toggleDisplayAction()

        if (!document.querySelector('#tivan')) {
            this.createContentContainer()
        }
    }

    render (): React.ReactNode {
        const { display } = this.props
        const label = 'Tivan Stats'

        return (
            <>
                <NavbarGlobalStyles/>
                <NavbarButton onClick={this.handleClick}>
                    <TooltipContainer aria-label={label} data-tip={label}>
                        <IconContext.Provider value={{ style: { width: '1em', height: '1em' } }}>
                            {display ? <BsPieChartFill /> : <BsPieChart />}
                        </IconContext.Provider>
                    </TooltipContainer>
                </NavbarButton>
                <Tooltip place="bottom" type="dark" effect="solid"/>
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
    toggleDisplayAction
}

export default connect<NavbarItemStateProps, NavbarItemDispatchProps>(mapStateToProps, mapDispatchToProps)(NavbarItem)
