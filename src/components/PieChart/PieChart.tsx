import React from 'react'
import { PieChart as RechartsPieChart, Pie, Sector, Cell, Legend } from 'recharts'
import { variables } from '@styles'
import { ChartContainer, TableDataItem } from '@components'

interface ActiveShapeProps {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    startAngle: number;
    endAngle: number;
    fill: string;
    payload: TableDataItem;
    percent: number;
    value: number;
}

const renderActiveShape = (props: ActiveShapeProps): React.ReactNode => {
    const RADIAN = Math.PI / 180
    const {
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        startAngle,
        endAngle,
        payload,
        percent,
        value
    } = props
    const sin = Math.sin(-RADIAN * midAngle)
    const cos = Math.cos(-RADIAN * midAngle)
    const sx = cx + (outerRadius + 10) * cos
    const sy = cy + (outerRadius + 10) * sin
    const mx = cx + (outerRadius + 30) * cos
    const my = cy + (outerRadius + 30) * sin
    const ex = mx + (cos >= 0 ? 1 : -1) * 22
    const ey = my
    const textAnchor = cos >= 0 ? 'start' : 'end'

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={payload.color}>{payload.name}</text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={payload.color}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={payload.color}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={payload.color} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={payload.color} stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill={variables.colors.orange60}>
                {`${value} ${(value === 1 ? 'movie' : 'movies')}`}
            </text>
            <text
                x={ex + (cos >= 0 ? 1 : -1) * 12}
                y={ey}
                dy={18}
                textAnchor={textAnchor}
                fill={variables.colors.gray20}
            >
                {`${(percent * 100).toFixed(2)}%`}
            </text>
        </g>
    )
}

interface StatsVideoResolutionProps {
    data: TableDataItem[];
}

const initialState = {
    activeIndex: 0
}

type State = Readonly<typeof initialState>;

class PieChart extends React.Component<StatsVideoResolutionProps> {
    state: State = initialState

    onPieEnter = (data: TableDataItem[], index: number): void => {
        this.setState({
            activeIndex: index
        })
    }

    renderLegend (value: string): React.ReactNode {
        return <small>{value}</small>
    }

    render (): React.ReactNode {
        const { data } = this.props

        return (
            <div>
                <ChartContainer width="100%" height={300}>
                    <RechartsPieChart>
                        <Pie
                            activeIndex={this.state.activeIndex}
                            activeShape={renderActiveShape}
                            data={data}
                            innerRadius={40}
                            outerRadius={100}
                            paddingAngle={5}
                            dataKey="value"
                            onMouseEnter={this.onPieEnter}
                        >
                            {data.map((entry, index) => <Cell key={index} stroke="none" fill={entry.color}/>)}
                        </Pie>
                        <Legend
                            formatter={this.renderLegend}
                            verticalAlign="bottom"
                            height={24}
                            iconType="circle"
                            iconSize={8}
                        />
                    </RechartsPieChart>
                </ChartContainer>
            </div>
        )
    }
}

export default PieChart
