import styled from 'styled-components'
import { variables } from '@styles'

export const Badge = styled.div`
    ${variables.fontFamily.semiBold}
    display: inline-flex;
    padding: 0 ${variables.spacing.m};
    color: ${variables.colors.whiteA75};
    font-size: 1.6rem;
    line-height: 1.5em;
    white-space: nowrap;
    background-color: ${variables.colors.blackA15};
    border-radius: ${variables.borderRadius.s};
    transition: all 0.2s;
`
