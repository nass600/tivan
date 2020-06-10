import styled from 'styled-components'
import { variables } from '@styles'

export const Button = styled.button`
    ${variables.font.h4}
    display: inline-flex;
    padding: ${variables.spacing.m} ${variables.spacing.l};
    color: ${variables.colors.white};
    text-transform: uppercase;
    background-color: ${variables.colors.orange60};
    border: 0;
    border-radius: ${variables.borderRadius.s};
    outline: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
        color: ${variables.colors.white};
        background-color: ${variables.colors.orange40};
    }
`

export const CancelButton = styled(Button)`
    background-color: ${variables.colors.red60};
`
