import { createGlobalStyle } from 'styled-components'
import OpenSansBold from '@assets/fonts/OpenSans-Bold.ttf'
import OpenSansSemibold from '@assets/fonts/OpenSans-SemiBold.ttf'
import OpenSansRegular from '@assets/fonts/OpenSans-Regular.ttf'
import { variables } from '@styles'

export const OptionsGlobalStyles = createGlobalStyle`
    @font-face {
        font-weight: 500;
        font-family: ${variables.fontName.bold};
        font-style: normal;
        src: url(${OpenSansBold}) format('ttf');
    }

    @font-face {
        font-weight: 300;
        font-family: ${variables.fontName.semiBold};
        font-style: normal;
        src: url(${OpenSansSemibold}) format('ttf');
    }

    @font-face {
        font-family: ${variables.font.base};
        font-style: normal;
        src: url(${OpenSansRegular}) format('ttf');
    }

    & * {
        box-sizing: border-box;
    }

    html,
    body {
        height: 100%;
    }

    body {
        margin: 0;
        color: ${variables.colors.white};
        font-size: 16px;
        font-family: ${variables.fontFamily.regular}, Helvetica, sans-serif;
        line-height: 1.5;
        background-color: ${variables.colors.gray60};
    }

    #tivan {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }

    a {
        color: ${variables.colors.gray40};
        font-weight: bold;
        font-family: Open Sans Bold, Helvetica, sans-serif;
        text-decoration: none;
        transition: color 0.2s ease-in-out;

        &:hover {
            color: ${variables.colors.orange60};
        }
    }

    button {
        outline: none;
    }
`
