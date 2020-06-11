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
    s: `${fontSizeBase * 0.8}rem`, // 8px
    p: `${fontSizeBase * 1.3}rem`, // 13px
    h4: `${fontSizeBase * 1.5}rem`, // 15px
    h3: `${fontSizeBase * 2}rem`, // 20px
    h2: `${fontSizeBase * 2.4}rem`, // 24px
    h1: `${fontSizeBase * 2.4}rem` // 24px
}

// Font Family
const fontFamily = {
    regular: css`font-family: ${fontName.regular}, Helvetica, sans-serif;`,
    semiBold: css`font-family: ${fontName.semiBold}, Helvetica, sans-serif;`,
    bold: css`font-family: ${fontName.bold}, Helvetica, sans-serif;`
}

const fontBase = css`
    ${fontFamily.regular}
    font-size: ${fontSize.p};
`
const fontSmall = css`
    ${fontFamily.regular}
    font-size: ${fontSize.s};
`

const fontH1 = css`
    ${fontFamily.bold}
    font-size: ${fontSize.h1};
    line-height: 1.2em;
`

const fontH2 = css`
    ${fontFamily.bold}
    font-size: ${fontSize.h2};
    line-height: 1em;
`

const fontH3 = css`
    ${fontFamily.bold}
    font-size: ${fontSize.h3};
    line-height: 1em;
`

const fontH4 = css`
    ${fontFamily.bold}
    font-size: ${fontSize.h4};
    line-height: 1em;
`

export const variables = {
    spacing: {
        s: `${spacerBase / 2}rem`,
        m: `${spacerBase}rem`,
        l: `${spacerBase * 2}rem`,
        xl: `${spacerBase * 3}rem`,
        xxl: `${spacerBase * 4}rem`,
        gutter: `${spacerBase * 3}rem`
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
        orange40: '#e8aa26',
        orange60: '#e5a00d',
        orange80: '#cc7b19',
        red20: '#f5ccc6',
        red40: '#f76553',
        red60: '#dd4b39',
        blue20: '#d8f5ff',
        blue60: '#007dc7',
        yellow20: '#f1e8d2',
        yellow60: '#e0a700'
    },
    palettes: {
        blue: ['#8893c7', '#f5cf73', '#5a67a7', '#d3aa47', '#3c4b90', '#ffe4a3', '#26357b', '#b58b26'],
        red: ['#f57373', '#5cc45c', '#d34747', '#39a939', '#b52626', '#1f911f', '#ffa3a3', '#8cdc8c'],
        turquoise: ['#d38247', '#2c8371', '#ffcaa3', '#78bcb5', '#f5aa73', '#489890', '#b56326', '#187067'],
        green: ['#64b28a', '#5e88a1', '#99d2b5', '#95b5c8', '#3b9567', '#3a6b87', '#d2ecdf', '#d0dfe8']
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
        h3: fontH3,
        h4: fontH4
    },
    fontName,
    fontFamily
}
