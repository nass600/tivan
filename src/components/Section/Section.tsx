import styled from 'styled-components'
import { variables } from '@styles'
import { Title } from '@components'

const Section = styled.div`
    padding: ${variables.spacing.xxl} 0;
    border-top: 2px solid ${variables.colors.blackA30};

    ${Title} {
        ${variables.font.h2}
        margin-top: 0;
        margin-bottom: ${variables.spacing.l};
        text-transform: uppercase;
    }
`

export default Section
