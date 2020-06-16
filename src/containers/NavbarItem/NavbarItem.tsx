import React, { Component, AnchorHTMLAttributes } from 'react'
import { connect, Provider } from 'react-redux'
import { toggleDisplayAction, disableTourAction } from '@actions'
import { render } from 'react-dom'
import store from '@store/createStore'
import { variables } from '@styles'
import { Content } from '@containers'
import { Tooltip } from '@components'
import { IconContext } from 'react-icons'
import { AppState } from '@reducers'
import styled, { createGlobalStyle, FlattenSimpleInterpolation, css } from 'styled-components'
import Joyride, { CallBackProps, STATUS } from 'react-joyride'

const NavbarGlobalStyles = createGlobalStyle`
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

const NavbarButton = styled.a<NavbarButtonProps>`
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
    user-select: none;
    touch-action: manipulation;

    &,
    path {
        transition: fill 0.2s;
    }

    svg {
        width: 1em;
        height: 1em;

        .st2 {
            fill: transparent;
        }

        .st1 {
            fill: ${variables.colors.whiteA20};

            ${({ selected }): FlattenSimpleInterpolation | false => selected === 1 && css`
                fill: ${variables.colors.orange60};
            `}
        }
    }

    &:hover {
        color: inherit;

        ${({ selected }): FlattenSimpleInterpolation | false => selected === 0 && css`
            color: ${variables.colors.white};

            /* stylelint-disable-next-line no-duplicate-selectors */
            svg .st1 {
                fill: ${variables.colors.orange60};
            }
        `}
    }

    ${({ selected }): FlattenSimpleInterpolation | false => selected === 1 && css`
        color: ${variables.colors.white};
    `}
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

const logoSvg = (
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 515.7 517.3">
        <path className="st1"
            d="M367.5,480.1l-49.9-123.4c-1.6-4-0.3-8.5,3.2-11c32.8-23.3,49.8-63.6,43.7-103.4c-0.7-4.2,1.7-8.4,5.6-10
            l123.4-49.9c5.1-2.1,10.8,0.8,12.3,6.1c16.1,56.2,12.5,115.8-10.7,170.4c-23.1,54.4-63.3,98.3-114.8,125.8
            C375.6,487.3,369.6,485.2,367.5,480.1z"/>
        <path className="st2"
            d="M370.2,232.3l25.4-10.3c16.7,62.4-11.3,128.5-67.6,160l-10.3-25.5c-1.6-4-0.3-8.5,3.2-11
            c32.8-23.3,49.8-63.6,43.7-103.4C363.9,238.1,366.2,233.9,370.2,232.3z"/>
        <path className="st1"
            d="M135.3,484.7c-51.4-27.5-91.7-71.3-114.8-125.8C-2.6,304.3-6.2,244.8,9.9,188.5c1.5-5.3,7.2-8.1,12.3-6.1
            l123.4,49.9c4,1.6,6.3,5.7,5.6,10c-6.2,39.8,10.9,80,43.7,103.4c3.5,2.5,4.8,7,3.2,11l-49.9,123.4
            C146.2,485.2,140.1,487.3,135.3,484.7z"/>
        <path className="st2"
            d="M151.2,242.3c-6.2,39.8,10.9,80,43.7,103.4c3.5,2.5,4.8,7,3.2,11l-10.3,25.5c-56.3-31.5-84.3-97.6-67.6-160
            l25.4,10.3C149.6,233.9,151.9,238.1,151.2,242.3z"/>
        <g>
            <path className="st3"
                d="M347.2,197c2.5,3.5,7,4.9,11,3.3l123.4-49.9c5.1-2.1,7.3-8.1,4.7-12.9c-27.5-51.6-71.4-92-126-115.2
                C327.8,8.5,293.1,1.8,258.4,2v149.8C293.2,151.3,326.8,168.1,347.2,197z"/>
            <path className="st3"
                d="M170.5,197c20.4-28.9,54-45.6,88.8-45.2V2C224.7,1.8,190,8.5,157.5,22.3C102.9,45.5,59,85.9,31.5,137.5
                c-2.6,4.8-0.4,10.9,4.7,12.9l123.4,49.9C163.5,201.9,168.1,200.5,170.5,197z"/>
        </g>
        <g>
            <path className="st4"
                d="M347.2,197c2.5,3.5,7,4.9,11,3.3l25.5-10.3c-25.5-46.3-74.2-73.7-125.3-73.3v35.1
                C293.2,151.3,326.8,168.1,347.2,197z"/>
            <path className="st4"
                d="M170.5,197c20.4-28.9,54-45.6,88.8-45.2v-35.1c-51.1-0.4-99.8,27-125.3,73.3l25.5,10.3
                C163.5,201.9,168.1,200.5,170.5,197z"/>
        </g>
        <g>
            <path className="st3"
                d="M258.4,365.4v150c24.2,0.1,48.4-3.2,72.1-10c5.3-1.5,8.1-7.2,6-12.3l-49.8-123.3c-1.6-4-5.8-6.3-10-5.6
                C270.6,365.1,264.4,365.5,258.4,365.4z"/>
            <path className="st3"
                d="M241.1,364.1c-4.3-0.7-8.4,1.6-10,5.6L181.3,493c-2.1,5.1,0.8,10.8,6,12.3c23.6,6.8,47.9,10.1,72.1,
                10v-150C253.3,365.5,247.2,365.1,241.1,364.1z"/>
        </g>
        <g>
            <path className="st4"
                d="M258.4,365.4v34.8c12.8,0.1,25.8-1.5,38.6-5l-10.3-25.4c-1.6-4-5.8-6.3-10-5.6
                C270.6,365.1,264.4,365.5,258.4,365.4z"/>
            <path className="st4"
                d="M241.1,364.1c-4.3-0.7-8.4,1.6-10,5.6l-10.3,25.4c12.8,3.5,25.8,5.1,38.6,5v-34.8
                C253.3,365.5,247.2,365.1,241.1,364.1z"/>
        </g>
    </svg>
)

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
                <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}/>
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
                <NavbarGlobalStyles/>
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
                    {logoSvg}
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
