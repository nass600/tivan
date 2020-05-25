import React from 'react'
import { variables } from '@styles'
import styled, { FlattenSimpleInterpolation } from 'styled-components'

const StyledTable = styled.table<{styles?: FlattenSimpleInterpolation}>`
    width: 100%;

    ${({ styles }): FlattenSimpleInterpolation | undefined => styles && styles}
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

const Heading = styled.th`
    ${variables.fontFamily.bold}
    padding: ${variables.spacing.m} ${variables.spacing.l};
    text-align: left;
    text-transform: uppercase;
    vertical-align: middle;
`

export interface TableItem {
    // eslint-disable-next-line
    [x: string]: any;
}

interface TableProps {
    styles?: FlattenSimpleInterpolation;
    data: {
        headings: string[];
        items: TableItem[];
    };
}

class Table extends React.Component<TableProps> {
    render (): React.ReactNode {
        const { data, styles } = this.props

        return (
            <StyledTable styles={styles}>
                <tbody>
                    <Row>
                        {data.headings.map((item: string, index: number): React.ReactNode => (
                            <Heading key={index}>{item}</Heading>
                        ))}
                    </Row>
                    {data.items.map((item: TableItem, index: number): React.ReactNode => (
                        <Row key={index}>
                            {Object.keys(item).map((key: keyof TableItem, i: number): React.ReactNode => (
                                <Cell key={i}>{item[key]}</Cell>
                            ))}
                        </Row>
                    ))}
                </tbody>
            </StyledTable>
        )
    }
}

export default Table
