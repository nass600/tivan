import { createGlobalStyle } from 'styled-components'
import OpenSansBold from '@assets/fonts/OpenSans-Bold.ttf'
import OpenSansSemibold from '@assets/fonts/OpenSans-SemiBold.ttf'
import OpenSansRegular from '@assets/fonts/OpenSans-Regular.ttf'
import { variables } from '@styles'

export const GlobalStyles = createGlobalStyle`
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

    #tivan {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 100%;
        color: ${variables.colors.whiteA75};
    }

    #tivan-button {
        height: 100%;
    }

    a {
        ${variables.fontFamily.bold}
        color: ${variables.colors.orange60};
        text-decoration: none;
        transition: color 0.2s ease-in-out;

        &:hover {
            color: ${variables.colors.orange40};
        }
    }

    strong {
        ${variables.fontFamily.bold}
        color: ${variables.colors.white};
    }
`
