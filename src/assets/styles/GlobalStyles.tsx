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
        font-family: ${variables.fontName.regular};
        font-style: normal;
        src: url(${OpenSansRegular}) format('ttf');
    }

    & * {
        box-sizing: border-box;
    }

    html {
        font-size: ${variables.fontSize.root};
    }

    html,
    body {
        height: 100%;
    }

    body {
        ${variables.font.base}
        margin: 0;
        background-color: ${variables.colors.gray60};
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

        .type-dark.place-bottom {
            margin-top: -0.5rem;
        }
    }

    strong {
        ${variables.fontFamily.bold}
        color: ${variables.colors.white};
    }

    a {
        text-decoration: none;
    }

    hr {
        display: flex;
        width: 100%;
        border: 0;
        border-top: 1px solid ${variables.colors.gray20};
        margin-block-start: ${variables.spacing.m};
        margin-block-end: ${variables.spacing.m};
    }
`
