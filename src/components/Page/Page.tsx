import styled from 'styled-components'
import { variables } from '@styles'

const Page = styled.div`
    width: 100%;
    padding: 0 ${variables.spacing.l};
    overflow-x: hidden;
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 14px;
    }

    &::-webkit-scrollbar-track {
        background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
        min-height: 50px;
        background-color: ${variables.colors.whiteA20};
        background-clip: padding-box;
        border: 3px solid transparent;
        border-radius: 8px;
    }
`

export default Page
