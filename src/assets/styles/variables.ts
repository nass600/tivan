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

const fontH2 = css`
    ${fontFamily.bold}
    font-size: ${fontSize.xl};
    line-height: 1em;
`

const fontH3 = css`
    ${fontFamily.bold}
    font-size: ${fontSize.l};
    line-height: 1em;
`

export const variables = {
    spacing: {
        s: `${spacerBase / 2}rem`,
        m: `${spacerBase}rem`,
        l: `${spacerBase * 2}rem`,
        xl: `${spacerBase * 3}rem`,
        xxl: `${spacerBase * 4}rem`
    },
    colors: {
        white: '#fff',
        whiteA08: 'hsla(0, 0%, 100%, 0.08)',
        whiteA20: 'hsla(0, 0%, 100%, 0.2)',
        whiteA30: 'hsla(0, 0%, 100%, 0.3)',
        whiteA45: 'hsla(0, 0%, 100%, 0.45)',
        whiteA75: 'hsla(0, 0%, 100%, 0.75)',
        blackA15: 'rgba(0, 0, 0, 0.15)',
        blackA30: 'rgba(0, 0, 0, 0.3)',
        gray20: '#bcbdbe',
        gray40: '#51595e',
        gray60: '#3f4245',
        gray80: '#282a2d',
        gray100: '#191a1c',
        orange20: '#fef8ec',
        orange60: '#e5a00d',
        red40: '#f5ccc6',
        red60: '#dd4b39'
    },
    palettes: {
        blue: ['#8893c7', '#f5cf73', '#5a67a7', '#d3aa47', '#3c4b90', '#ffe4a3', '#26357b', '#b58b26'],
        red: ['#f57373', '#5cc45c', '#d34747', '#39a939', '#b52626', '#1f911f', '#ffa3a3', '#8cdc8c'],
        turquoise: ['#d38247', '#2c8371', '#ffcaa3', '#78bcb5', '#f5aa73', '#489890', '#b56326', '#187067']
    },
    borderRadius: {
        s: '4px',
        m: '6px'
    },
    font: {
        small: fontSmall,
        base: fontBase,
        h1: fontH1,
        h2: fontH2,
        h3: fontH3
    },
    fontName,
    fontFamily
}
