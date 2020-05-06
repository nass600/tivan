import styled, { createGlobalStyle } from 'styled-components'
import { variables } from '@styles'
import { AnchorHTMLAttributes } from 'react'

export const NavbarGlobalStyles = createGlobalStyle`
    #tivan-button {
        height: 100%;
    }
`
export const NavbarButton = styled.a<AnchorHTMLAttributes<HTMLAnchorElement>>`
    position: relative;
    display: inline-flex;
    align-items: center;
    padding: 0 15px;
    height: 100%;
    font-size: 20px;
    margin: 0;
    outline: none;
    border: 0;
    background: none;
    text-align: inherit;
    text-decoration: none;
    cursor: pointer;
    transition: color 0.2s ease-in-out;
    user-select: none;
    touch-action: manipulation;
    color: ${variables.colors.gray20};

    &:hover {
        color: ${variables.colors.white};
    }
`
