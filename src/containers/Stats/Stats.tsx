import React from 'react'
import { connect } from 'react-redux'
import { AppState } from '@reducers'
import {
    PieChart,
    Table,
    Section,
    Column,
    Row,
    Title,
    SectionTitle,
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
                            <span>{connection} - Stats</span>
                            <Badge>{currentLibrary?.totalItems}</Badge>
                        </Title>
                        {videoResolutionStats && videoResolutionStats.length > 0 && (
                            <Section>
                                <SectionTitle>Video Resolution</SectionTitle>
                                <Row>
                                    <Column>
                                        <PieChart data={videoResolutionStats} nameFormatter={formatShort}/>
                                    </Column>
                                    <Column>
                                        <Table data={videoResolutionTable} styles={tableStyles}/>
                                    </Column>
                                </Row>
                            </Section>
                        )}
                        {videoCodecStats && videoCodecStats.length > 0 && (
                            <Section>
                                <SectionTitle>Video Codec</SectionTitle>
                                <Row>
                                    <Column>
                                        <PieChart data={videoCodecStats} nameFormatter={formatShort}/>
                                    </Column>
                                    <Column>
                                        <Table data={videoCodecTable} styles={tableStyles}/>
                                    </Column>
                                </Row>
                            </Section>
                        )}
                        {audioCodecStats && audioCodecStats.length > 0 && (
                            <Section>
                                <SectionTitle>Audio Codec</SectionTitle>
                                <Row>
                                    <Column>
                                        <PieChart data={audioCodecStats} nameFormatter={formatShort}/>
                                    </Column>
                                    <Column>
                                        <Table data={audioCodecTable} styles={tableStyles}/>
                                    </Column>
                                </Row>
                            </Section>
                        )}
                        {subtitleCodecStats && subtitleCodecStats.length > 0 && (
                            <Section>
                                <SectionTitle>Subtitle Codec</SectionTitle>
                                <Row>
                                    <Column>
                                        <PieChart data={subtitleCodecStats} nameFormatter={formatShort}/>
                                    </Column>
                                    <Column>
                                        <Table data={subtitleCodecTable} styles={tableStyles}/>
                                    </Column>
                                </Row>
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
