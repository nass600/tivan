import styled from 'styled-components'
import { variables } from '@styles'
import ReactTooltip from 'react-tooltip'

export const TooltipContainer = styled.span`
    display: inline-flex;
`

export const Tooltip = styled(ReactTooltip)`
    &.type-dark.place-bottom {
        margin-top: 1.5rem;
        padding: ${variables.spacing.s};
        line-height: 1;
        background: ${variables.colors.gray100};
        box-shadow: 0 3px 6px 0 ${variables.colors.blackA30};
        opacity: 1;

        &::after {
            border-bottom-color: ${variables.colors.gray100} !important;
        }
    }
`
