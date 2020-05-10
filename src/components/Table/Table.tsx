import React from 'react'
import { variables } from '@styles'
import styled from 'styled-components'
import { darken } from 'polished'

const StyledTable = styled.table`
    width: 100%;
    max-width: 70%;
    margin: 0 auto;
`

const Row = styled.tr`
    &:nth-child(2n+1) {
        background-color: ${variables.colors.blackA15};
    }
`

const Cell = styled.td`
    padding: ${variables.spacing.m} ${variables.spacing.l};
    color: ${variables.colors.gray20};
    text-align: left;
    vertical-align: middle;
`

const FixedCell = styled(Cell)`
    width: ${variables.spacing.xxl};
    text-align: center;
`

const Heading = styled.th`
    ${variables.fontFamily.bold}
    padding: ${variables.spacing.m} ${variables.spacing.l};
    text-align: left;
    text-transform: uppercase;
    vertical-align: middle;
`

const FixedHeading = styled(Heading)`
    width: ${variables.spacing.xxl};
    text-align: center;
`

const Legend = styled.div<{color: string}>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${variables.spacing.l};
    height: ${variables.spacing.l};
    border-radius: 50%;
    ${({ color }): string => `
        background-color: ${color};
        color: ${darken(0.5, color)};
    `}
`

export interface TableDataItem {
    color: string;
    name: string;
    value: number;
    proportion: number;
}

export interface TableInfo {
    headings: string[];
    items: TableDataItem[];
}

interface TableProps {
    data: TableInfo;
}

class Table extends React.Component<TableProps> {
    render (): React.ReactNode {
        const { data } = this.props
        const items = data.items.sort((a, b) => (a.value < b.value) ? 1 : -1)

        return (
            <StyledTable>
                <tbody>
                    <Row>
                        {data.headings.map((item: string, index: number): React.ReactNode => {
                            if (index === 0) {
                                return <FixedHeading key={index}>#</FixedHeading>
                            } else if (index === data.headings.length - 1) {
                                return <FixedHeading key={index}>{item}</FixedHeading>
                            }

                            return <Heading key={index}>{item}</Heading>
                        })}
                    </Row>
                    {items.map((item, index: number): React.ReactNode => (
                        <Row key={index}>
                            {Object.keys(item).map((key: keyof TableDataItem, i: number): React.ReactNode => {
                                if (i === 0) {
                                    return (
                                        <FixedCell key={i}>
                                            <Legend color={item[key] as string}>{index + 1}</Legend>
                                        </FixedCell>
                                    )
                                } else if (i === Object.keys(item).length - 1) {
                                    return (
                                        <FixedCell key={i}>{item[key]}</FixedCell>
                                    )
                                }

                                return <Cell key={i}>{item[key]}</Cell>
                            })}
                        </Row>
                    ))}
                </tbody>
            </StyledTable>
        )
    }
}

export default Table
