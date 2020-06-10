import styled from 'styled-components'
import { variables } from '@styles'

export const SectionTitle = styled.h4`
    ${variables.font.h4}
    margin-top: 0;
    margin-bottom: ${variables.spacing.l};
    color: ${variables.colors.white};
    text-transform: uppercase;
`

export default SectionTitle
