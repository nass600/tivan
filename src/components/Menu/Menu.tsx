import React from 'react'
import { variables } from '@styles'
import styled, { css, FlattenSimpleInterpolation } from 'styled-components'

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

class Menu extends React.Component<{}> {
    render (): React.ReactNode {
        return (
            <Navbar>
                <Tab active>Stats</Tab>
                <Tab>Normalization</Tab>
                <Tab>Forecast</Tab>
            </Navbar>
        )
    }
}

export default Menu
