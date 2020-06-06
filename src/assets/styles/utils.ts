import { css } from 'styled-components'
import { variables } from '@styles'

export const customScrollbar = css`
    &::-webkit-scrollbar {
        width: 14px;
    }

    &::-webkit-scrollbar-track {
        background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
        min-height: 50px;
        background-color: ${variables.colors.whiteA20};
        background-clip: padding-box;
        border: 3px solid transparent;
        border-radius: 8px;
    }
`
