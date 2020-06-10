import styled from 'styled-components'
import { variables } from '@styles'
import { Badge } from '@components'

export const Title = styled.h2`
    ${variables.font.h2}
    display: flex;
    align-items: center;
    margin-top: ${variables.spacing.xxl};
    margin-bottom: ${variables.spacing.l};
    color: ${variables.colors.white};

    ${Badge} {
        margin-left: ${variables.spacing.l};
    }
`

export default Title
