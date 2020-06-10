import styled from 'styled-components'
import { variables } from '@styles'

const Row = styled.div`
    display: flex;
    flex-direction: row;
    margin-right: -${variables.spacing.gutter};
    margin-left: -${variables.spacing.gutter};
`

export default Row
