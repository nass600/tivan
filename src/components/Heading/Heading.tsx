import styled from 'styled-components'
import { variables } from '@styles'

export const Heading1 = styled.h1`
    ${variables.font.h1}
    display: flex;
    align-items: center;
    margin-top: ${variables.spacing.xxl};
    margin-bottom: ${variables.spacing.xl};
    color: ${variables.colors.white};
`

export const Heading2 = styled.h2`
    ${variables.font.h2}
    display: flex;
    align-items: center;
    margin-top: ${variables.spacing.xxl};
    margin-bottom: ${variables.spacing.l};
    color: ${variables.colors.white};
`

export const Heading3 = styled.h3`
    ${variables.font.h3}
    display: flex;
    align-items: center;
    margin-top: ${variables.spacing.xl};
    margin-bottom: ${variables.spacing.xl};
    color: ${variables.colors.white};
`

export const Heading4 = styled.h4`
    ${variables.font.h4}
    display: flex;
    align-items: center;
    margin-top: 0;
    margin-bottom: ${variables.spacing.l};
    color: ${variables.colors.white};
    text-transform: uppercase;
`
