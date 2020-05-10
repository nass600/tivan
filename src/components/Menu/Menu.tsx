import React from 'react'
import { variables } from '@styles'
import styled, { css, FlattenSimpleInterpolation } from 'styled-components'
import { Tabs } from '@reducers/status'
import { connect } from 'react-redux'
import { AppState } from '@reducers'
import { toggleTabAction } from '@actions'

export const Navbar = styled.div`
    z-index: 1;
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50px;
    padding: 0 ${variables.spacing.m};
    color: ${variables.colors.whiteA75};
    background-color: ${variables.colors.blackA15};
    box-shadow: none;
`

export const Tab = styled.a<{active?: boolean}>`
    ${variables.font.h2}
    max-width: 250px;
    margin: 0 ${variables.spacing.s};
    padding: ${variables.spacing.s} ${variables.spacing.l};
    color: ${variables.colors.whiteA45};
    line-height: 30px;
    text-transform: uppercase;
    background-color: transparent;
    border-radius: ${variables.borderRadius.s};
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
        color: ${variables.colors.white};
        background-color: ${variables.colors.blackA30};
    }

    ${({ active }): FlattenSimpleInterpolation | undefined | false => active && css`
        color: ${variables.colors.orange60};
        background-color: ${variables.colors.blackA15};
    `}
`

interface MenuStateProps {
    currentTab: Tabs;
}

interface MenuDispatchProps {
    toggleTabAction(tab: Tabs): void;
}

type MenuProps = MenuDispatchProps & MenuStateProps

class Menu extends React.Component<MenuProps> {
    changeTab = (event: React.MouseEvent<HTMLAnchorElement>): void => {
        event.preventDefault()
        const tab = (event.target as HTMLAnchorElement).dataset.value as Tabs

        if (!tab) {
            return
        }

        this.props.toggleTabAction(tab)
    }

    render (): React.ReactNode {
        const { currentTab } = this.props

        return (
            <Navbar>
                {Object.keys(Tabs).map((key: Tabs): React.ReactNode => (
                    <Tab
                        key={Tabs[key]}
                        active={currentTab === Tabs[key]}
                        onClick={this.changeTab}
                        data-value={Tabs[key]}
                    >
                        {Tabs[key]}
                    </Tab>
                ))}
            </Navbar>
        )
    }
}

const mapStateToProps = (state: AppState): MenuStateProps => {
    return {
        currentTab: state.status.currentTab
    }
}

const mapDispatchToProps: MenuDispatchProps = {
    toggleTabAction
}

export default connect<MenuStateProps, MenuDispatchProps>(mapStateToProps, mapDispatchToProps)(Menu)
