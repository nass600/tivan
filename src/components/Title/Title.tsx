import styled from 'styled-components'
import { variables } from '@styles'
import { Badge } from '@components'

export const Title = styled.h1`
    ${variables.font.h1}
    margin-top: ${variables.spacing.xxl};
    margin-bottom: ${variables.spacing.l};
    color: ${variables.colors.white};

    ${Badge} {
        margin-left: ${variables.spacing.l};
    }
`

export default Title
