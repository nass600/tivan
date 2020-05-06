import { createGlobalStyle } from 'styled-components'
import OpenSansBold from '@assets/fonts/OpenSans-Bold.ttf'
import OpenSansSemibold from '@assets/fonts/OpenSans-SemiBold.ttf'
import OpenSansRegular from '@assets/fonts/OpenSans-Regular.ttf'
import { variables } from '@styles'

export const GlobalStyles = createGlobalStyle`
    @font-face {
        font-family: ${variables.fontName.bold};
        src: url(${OpenSansBold}) format('ttf');
        font-weight: 500;
        font-style: normal;
    }

    @font-face {
        font-family: ${variables.fontName.semiBold};
        src: url(${OpenSansSemibold}) format('ttf');
        font-weight: 300;
        font-style: normal;
    }

    @font-face {
        font-family: ${variables.font.base};
        src: url(${OpenSansRegular}) format('ttf');
        font-style: normal;
    }

    & * {
        box-sizing: border-box;
    }

    body {
        margin: 0;
        background-color: ${variables.colors.gray60};
        color: ${variables.colors.white};
        font-family: ${variables.fontFamily.regular}, Helvetica, sans-serif;
        font-size: 16px;
        line-height: 1.5;
    }

    #tivan {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: purple;
    }

    #tivan-button {
        height: 100%;
    }

    [class^="Page-page"] {
        overflow-y: hidden;
        padding-right: 0;
    }

    /* a {
        font-family: Open Sans Bold, Helvetica, sans-serif;
        color: ${variables.colors.gray40};
        text-decoration: none;
        font-weight: bold;
        transition: color 0.2s ease-in-out;

        &:hover {
            color: ${variables.colors.orange60};
        }
    }

    button {
        outline: none;
    } */
`
