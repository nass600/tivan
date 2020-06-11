import styled from 'styled-components'
import { variables } from '@styles'

export const Link = styled.a`
    ${variables.fontFamily.bold}
    color: ${variables.colors.orange60};
    font-weight: bold;
    text-decoration: none;
    transition: color 0.2s ease-in-out;

    &:hover {
        color: ${variables.colors.orange40};
    }
`

export const CancelLink = styled(Link)`
    color: ${variables.colors.red60};

    &:hover {
        color: ${variables.colors.red40};
    }
`
