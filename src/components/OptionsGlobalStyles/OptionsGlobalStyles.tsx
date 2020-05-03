import { createGlobalStyle } from 'styled-components'
import OpenSansBold from '@assets/fonts/OpenSans-Bold.ttf'
import OpenSansSemibold from '@assets/fonts/OpenSans-SemiBold.ttf'
import OpenSansRegular from '@assets/fonts/OpenSans-Regular.ttf'

const OptionsGlobalStyles = createGlobalStyle`
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

    .box {
        background-color: #fff;
        max-width: 650px;
        width: 100%;
        border-radius: 6px;
        padding: 40px 90px;
        color: #51595e;
    }

    h1 {
        font-size: 2em;
        line-height: 1.2em;
        padding-bottom: 10px;
        margin-top: 20px;
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

    .title {
        text-align: center;
        color: #282a2d;
        font-family: Open Sans Bold, Helvetica, sans-serif;
    }

    .form-group {
        display: flex;
        flex-flow: row wrap;
        margin-top: 2rem;
    }

    label {
        order: 1;
        margin-bottom: 5px;
    }

    input {
        order: 3;
        width: 100%;
        padding: 5px 10px;
        height: 36px;
        border: 0;
        border-bottom: 1px solid #51595e;
        outline: none;

        &:focus {
            border-bottom: 1px solid #cc7b19;
        }
    }

    button {
        width: 100%;
        border: 0;
        border-radius: 4px;
        padding: 0.5rem 1em;
        height: 50px;
        background-color: #e5a00d;
        color: #fff;
        text-transform: none;

        &:hover {
            opacity: 0.9;
        }
    }

    .hint {
        text-align: center;
        margin-top: 3rem;
        font-size: 90%;
        font-family: Open Sans Regular, Helvetica, sans-serif;
    }

    .form-group.invalid {
        .invalid-feedback {
            color: #51595e;
        }

        input {
            background-color: rgba(255, 85, 51, 0.3);
            border-bottom: 1px solid #f53;
        }
    }

    .alert {
        margin-top: 2rem;
    }
`

export default OptionsGlobalStyles
