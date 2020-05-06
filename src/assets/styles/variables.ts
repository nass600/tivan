import { css } from 'styled-components'

const spacerBase = 1
const fontSizeBase = 1

// Font Name
const fontName = {
    regular: 'Open Sans Regular',
    semiBold: 'Open Sans SemiBold',
    bold: 'Open Sans Bold'
}

// Font Size
const fontSize = {
    s: `${fontSizeBase * 0.8}rem`, // small
    m: `${fontSizeBase}rem`, // p
    l: `${fontSizeBase * 1.2}rem`, // h3
    xl: `${fontSizeBase * 1.4}rem`, // h2
    xxl: `${fontSizeBase * 2}rem` // h1
}

// Font Family
const fontFamily = {
    regular: css`font-family: ${fontName.regular}, Helvetica, sans-serif;`,
    semiBold: css`font-family: ${fontName.semiBold}, Helvetica, sans-serif;`,
    bold: css`font-family: ${fontName.bold}, Helvetica, sans-serif;`
}

const fontBase = css`
    ${fontFamily.regular}
    font-size: ${fontSize.m};
`
const fontSmall = css`
    ${fontFamily.regular}
    font-size: ${fontSize.s};
`

const fontH1 = css`
    ${fontFamily.bold}
    font-size: ${fontSize.xxl};
    line-height: 1.2em;
`

export const variables = {
    spacing: {
        s: `${spacerBase / 2}rem`,
        m: `${spacerBase}rem`,
        l: `${spacerBase * 2}rem`,
        xl: `${spacerBase * 3}rem`
    },
    colors: {
        white: '#fff',
        gray20: '#bcbdbe',
        gray40: '#51595e',
        gray60: '#3f4245',
        gray80: '#282a2d',
        orange20: '#fef8ec',
        orange60: '#e5a00d',
        red40: '#f5ccc6',
        red60: '#dd4b39'
    },
    borderRadius: {
        s: '4px',
        m: '6px'
    },
    font: {
        small: fontSmall,
        base: fontBase,
        h1: fontH1
    },
    fontName,
    fontFamily
}
