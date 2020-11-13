import React from 'react'
import { connect } from 'react-redux'
import { AppState } from '@reducers'
import {
    PieChart,
    Table,
    Section,
    Column,
    Row,
    Heading2,
    Heading4,
    TableItem,
    Error,
    Badge
} from '@components'
import {
    getVideoResolutionChartData,
    getVideoCodecChartData,
    getAudioCodecChartData,
    getSubtitleCodecChartData,
    getCurrentLibrary
} from '@selectors'
import { StatsDataItem } from '@types'
import { formatShort, formatLong } from '@utils/name-formatter'
import styled, { css, FlattenSimpleInterpolation } from 'styled-components'
import { variables } from '@styles'
import { LibraryState } from '@reducers/library'
import { MdErrorOutline } from 'react-icons/md'
import { isEmpty } from 'lodash'

const Title = styled(Heading2)`
    ${Badge} {
        margin-left: ${variables.spacing.l};
    }
`

const StyledRow = styled(Row)`
    @media ${variables.device.mobile} {
        flex-direction: column;

        ${Column} + ${Column} {
            margin-top: ${variables.spacing.xl};
        }
    }

    @media ${variables.device.desktop} {
        flex-direction: row;

        ${Column} + ${Column} {
            margin-top: 0;
        }
    }
`

interface ContentStateProps {
    connection?: string;
    videoResolutionStats: StatsDataItem[];
    videoCodecStats: StatsDataItem[];
    audioCodecStats: StatsDataItem[];
    subtitleCodecStats: StatsDataItem[];
    currentLibrary: LibraryState | null;
}

const tableStyles = css`
    max-width: 80%;
    margin: 0 auto;

    tr {
        td:first-child,
        td:last-child,
        th:first-child,
        th:last-child {
            width: ${variables.spacing.xxl};
            text-align: center;
        }
    }
`

const Legend = styled.div<{color?: string}>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${variables.spacing.l};
    height: ${variables.spacing.l};
    border-radius: 50%;
    ${({ color }): FlattenSimpleInterpolation | '' | undefined => color && css`
        color: ${variables.colors.gray100};
        background-color: ${color};
    `}
`

class Stats extends React.Component<ContentStateProps, {}> {
    enhanceTableItems = (items: TableItem[]): TableItem[] => {
        return items.map((item: TableItem, index: number) => ({
            position: <Legend color={item.color as string}>{index + 1}</Legend>,
            name: formatLong(item.name),
            value: item.value,
            proportion: item.proportion
        }))
    }

    render (): React.ReactNode {
        const {
            connection,
            currentLibrary,
            videoResolutionStats,
            videoCodecStats,
            audioCodecStats,
            subtitleCodecStats
        } = this.props

        const videoResolutionTable = {
            headings: ['#', 'resolution', 'items', '%'],
            items: this.enhanceTableItems(videoResolutionStats || [])
        }

        const videoCodecTable = {
            headings: ['#', 'codec', 'items', '%'],
            items: this.enhanceTableItems(videoCodecStats || [])
        }

        const audioCodecTable = {
            headings: ['#', 'codec', 'items', '%'],
            items: this.enhanceTableItems(audioCodecStats || [])
        }

        const subtitleCodecTable = {
            headings: ['#', 'codec', 'items', '%'],
            items: this.enhanceTableItems(subtitleCodecStats || [])
        }

        return (
            <>
                {(!currentLibrary || isEmpty(currentLibrary.stats)) && (
                    <Error title="No stats found" icon={MdErrorOutline}>
                        <p>
                            It seems there are no stats recorded for the
                            library <strong>{currentLibrary?.title}</strong>
                        </p>
                    </Error>
                )}
                {!isEmpty(currentLibrary?.stats) && (
                    <>
                        <Title>
                            <span>{connection} &mdash; Stats</span>
                            <Badge>{currentLibrary?.totalItems}</Badge>
                        </Title>
                        {videoResolutionStats && videoResolutionStats.length > 0 && (
                            <Section>
                                <Heading4>Video Resolution</Heading4>
                                <StyledRow>
                                    <Column>
                                        <PieChart data={videoResolutionStats} nameFormatter={formatShort}/>
                                    </Column>
                                    <Column>
                                        <Table data={videoResolutionTable} styles={tableStyles}/>
                                    </Column>
                                </StyledRow>
                            </Section>
                        )}
                        {videoCodecStats && videoCodecStats.length > 0 && (
                            <Section>
                                <Heading4>Video Codec</Heading4>
                                <StyledRow>
                                    <Column>
                                        <PieChart data={videoCodecStats} nameFormatter={formatShort}/>
                                    </Column>
                                    <Column>
                                        <Table data={videoCodecTable} styles={tableStyles}/>
                                    </Column>
                                </StyledRow>
                            </Section>
                        )}
                        {audioCodecStats && audioCodecStats.length > 0 && (
                            <Section>
                                <Heading4>Audio Codec</Heading4>
                                <StyledRow>
                                    <Column>
                                        <PieChart data={audioCodecStats} nameFormatter={formatShort}/>
                                    </Column>
                                    <Column>
                                        <Table data={audioCodecTable} styles={tableStyles}/>
                                    </Column>
                                </StyledRow>
                            </Section>
                        )}
                        {subtitleCodecStats && subtitleCodecStats.length > 0 && (
                            <Section>
                                <Heading4>Subtitle Codec</Heading4>
                                <StyledRow>
                                    <Column>
                                        <PieChart data={subtitleCodecStats} nameFormatter={formatShort}/>
                                    </Column>
                                    <Column>
                                        <Table data={subtitleCodecTable} styles={tableStyles}/>
                                    </Column>
                                </StyledRow>
                            </Section>
                        )}
                    </>
                )}
            </>
        )
    }
}

const mapStateToProps = (state: AppState): ContentStateProps => {
    return {
        connection: state.auth.connection?.name,
        videoResolutionStats: getVideoResolutionChartData(state),
        videoCodecStats: getVideoCodecChartData(state),
        audioCodecStats: getAudioCodecChartData(state),
        subtitleCodecStats: getSubtitleCodecChartData(state),
        currentLibrary: getCurrentLibrary(state)
    }
}

export default connect<ContentStateProps>(mapStateToProps)(Stats)
