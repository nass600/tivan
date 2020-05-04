import { createGlobalStyle } from 'styled-components'
import OpenSansBold from '@assets/fonts/OpenSans-Bold.ttf'
import OpenSansSemibold from '@assets/fonts/OpenSans-SemiBold.ttf'
import OpenSansRegular from '@assets/fonts/OpenSans-Regular.ttf'

export const OptionsGlobalStyles = createGlobalStyle`
    @font-face {
        font-family: 'Open Sans Bold';
        src: url(${OpenSansBold}) format('ttf');
        font-weight: 500;
        font-style: normal;
    }

    @font-face {
        font-family: 'Open Sans Semibold';
        src: url(${OpenSansSemibold}) format('ttf');
        font-weight: 300;
        font-style: normal;
    }

    @font-face {
        font-family: 'Open Sans Regular';
        src: url(${OpenSansRegular}) format('ttf');
        font-style: normal;
    }

    html,
    body {
        height: 100%;
    }

    body {
        margin: 0;
        background-color: #3f4245;
        color: white;
        font-family: Open Sans Semibold, Helvetica, sans-serif;
        font-size: 16px;
        line-height: 1.5;
    }

    #tivan {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    a {
        font-family: Open Sans Bold, Helvetica, sans-serif;
        color: #51595e;
        text-decoration: none;
        font-weight: bold;
        transition: color 0.2s ease-in-out;

        &:hover {
            color: #cc7b19;
        }
    }

    .alert {
        margin-top: 2rem;
    }
`
