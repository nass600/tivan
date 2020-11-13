import styled from 'styled-components'
import { variables } from '@styles'
import { ResponsiveContainer } from 'recharts'

const ChartContainer = styled(ResponsiveContainer)`
    min-width: 0;
    color: ${variables.colors.gray20};
    background-color: ${variables.colors.blackA15};

    .recharts-legend-item {
        margin-right: 0;

        + & {
            margin-left: ${variables.spacing.m};
        }
    }
`

export default ChartContainer
