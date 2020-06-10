import styled from 'styled-components'
import { variables, customScrollbar } from '@styles'

const Page = styled.div`
    ${customScrollbar}
    width: 100%;
    padding: 0 ${variables.spacing.gutter};
    overflow-x: hidden;
    overflow-y: auto;
`

export default Page
