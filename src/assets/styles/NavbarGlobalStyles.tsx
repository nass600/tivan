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
