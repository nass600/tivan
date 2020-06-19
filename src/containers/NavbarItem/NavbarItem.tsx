import React, { Component, AnchorHTMLAttributes } from 'react'
import { connect, Provider } from 'react-redux'
import { toggleDisplayAction, disableTourAction } from '@actions'
import { render } from 'react-dom'
import store from '@store/createStore'
import { variables } from '@styles'
import { Content } from '@containers'
import { Tooltip } from '@components'
import { AppState } from '@reducers'
import styled, { createGlobalStyle, FlattenSimpleInterpolation, css } from 'styled-components'
import Joyride, { CallBackProps, STATUS } from 'react-joyride'
import Logo from '@assets/img/logo.svg'

const GlobalStyles = createGlobalStyle`
    .__floater__body {
        ${variables.font.base}
        font-size: 14px;

        h4 {
            ${variables.font.h4}
            color: ${variables.colors.orange60};
        }

        button[data-action="close"] {
            path {
                transition: all 0.2s ease-in;
            }

            &:hover {
                path {
                    fill: ${variables.colors.orange40};
                }
            }
        }

        button[data-action="primary"] {
            ${variables.font.h4}
            padding: ${variables.spacing.m} ${variables.spacing.l} !important;
            font-size: ${variables.fontSize.h4} !important;
            text-transform: uppercase;
            border-radius: ${variables.borderRadius.s} !important;
            outline: none;
            cursor: pointer;
            transition: all 0.2s ease-in-out;

            &:hover {
                color: ${variables.colors.white};
                background-color: ${variables.colors.orange40} !important;
            }
        }

        .react-joyride__tooltip {
            border: 1px solid ${variables.colors.orange60};
        }
    }

    .react-joyride__spotlight {
        border-radius: 50% !important;
    }

    #tivan-button {
        height: 100%;

        .type-dark.place-bottom {
            margin-top: -0.5rem;
        }
    }
`
interface NavbarButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    selected: number;
}

const iconSize = '20px'

const NavbarButton = styled.a<NavbarButtonProps>`
    position: relative;
    display: inline-flex;
    align-items: center;
    height: 100%;
    margin: 0;
    padding: 0 15px;
    color: ${variables.colors.gray20};
    text-align: inherit;
    text-decoration: none;
    background: none;
    border: 0;
    outline: none;
    cursor: pointer;
    user-select: none;
    touch-action: manipulation;

    &,
    path {
        transition: fill 0.2s;
    }

    svg {
        width: ${iconSize};
        height: ${iconSize};

        .logo_svg__st3 {
            fill: ${variables.colors.whiteA75};

            ${({ selected }): FlattenSimpleInterpolation | false => selected === 1 && css`
                fill: ${variables.colors.white};
            `}
        }

        .logo_svg__st2,
        .logo_svg__st4 {
            fill: transparent;
        }

        .logo_svg__st1 {
            fill: ${variables.colors.whiteA20};

            ${({ selected }): FlattenSimpleInterpolation | false => selected === 1 && css`
                fill: ${variables.colors.orange60};
            `}
        }
    }

    &:hover {
        color: inherit;

        .logo_svg__st3 {
            fill: ${variables.colors.white};
        }

        ${({ selected }): FlattenSimpleInterpolation | false => selected === 0 && css`
            color: ${variables.colors.white};

            /* stylelint-disable-next-line no-duplicate-selectors */
            svg .logo_svg__st1 {
                fill: ${variables.colors.orange60};
            }
        `}
    }
`

interface NavbarItemDispatchProps {
    toggleDisplayAction(display?: boolean): void;
    disableTourAction(): void;
}

interface NavbarItemStateProps {
    display: boolean;
    displayTour: boolean;
}

const CONTAINER_SELECTOR = '#content [class^="FullPage-container"]'

type NavbarItemProps = NavbarItemDispatchProps & NavbarItemStateProps

class NavbarItem extends Component<NavbarItemProps> {
    state = {
        steps: [
            {
                target: '#tivan-button svg',
                disableBeacon: true,
                title: 'Tivan Extension',
                content: 'You can access your Library stats by clicking on this icon'
            }
        ]
    }

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

    disableTour = (props: CallBackProps): void => {
        if (props.status === STATUS.FINISHED) {
            this.props.disableTourAction()
        }
    }

    handleClick = (event: React.MouseEvent<HTMLAnchorElement>): void => {
        event.preventDefault()
        this.props.toggleDisplayAction()

        if (!document.querySelector('#tivan')) {
            this.createContentContainer()
        }
    }

    render (): React.ReactNode {
        const { display, displayTour } = this.props
        const { steps } = this.state
        const label = 'Tivan Stats'

        return (
            <>
                <GlobalStyles/>
                {displayTour && <Joyride
                    steps={steps}
                    spotlightPadding={10}
                    callback={this.disableTour}
                    styles={{
                        options: {
                            textColor: variables.colors.white,
                            arrowColor: variables.colors.orange60,
                            backgroundColor: '#1F2426',
                            primaryColor: variables.colors.orange60,
                            zIndex: 1000
                        }
                    }}
                />}
                <NavbarButton
                    onClick={this.handleClick}
                    selected={display ? 1 : 0}
                    aria-label={label}
                    data-tip={label}
                    data-for="tivan-button-tooltip"
                >
                    <Logo/>
                </NavbarButton>
                <Tooltip id="tivan-button-tooltip" place="bottom" type="dark" effect="solid"/>
            </>
        )
    }
}

const mapStateToProps = (state: AppState): NavbarItemStateProps => ({
    display: state.status.display || false,
    displayTour: state.status.displayTour || false
})

const mapDispatchToProps: NavbarItemDispatchProps = {
    toggleDisplayAction,
    disableTourAction
}

export default connect<NavbarItemStateProps, NavbarItemDispatchProps>(mapStateToProps, mapDispatchToProps)(NavbarItem)
