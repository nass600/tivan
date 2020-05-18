import React from 'react'
import { connect } from 'react-redux'
import { AppState } from '@reducers'
import { PieChart, Table, Section, Column, Row, Title, SectionTitle } from '@components'
import { getVideoResolutionChartData, getAudioCodecChartData, getSubtitleCodecChartData } from '@selectors'
import { StatsTableInfo } from '@types'
import { formatShort, formatLong } from '@utils/name-formatter'

interface ContentStateProps {
    connection?: string;
    videoResolutionStats: StatsTableInfo;
    audioCodecStats: StatsTableInfo;
    subtitleCodecStats: StatsTableInfo;
}

class Stats extends React.Component<ContentStateProps, {}> {
    render (): React.ReactNode {
        const { connection, videoResolutionStats, audioCodecStats, subtitleCodecStats } = this.props

        return (
            <>
                <Title>{connection} - Stats</Title>
                {videoResolutionStats.items.length > 0 && (
                    <Section>
                        <SectionTitle>Video Resolution</SectionTitle>
                        <Row>
                            <Column>
                                <PieChart data={videoResolutionStats.items} nameFormatter={formatShort}/>
                            </Column>
                            <Column>
                                <Table data={videoResolutionStats} nameFormatter={formatLong}/>
                            </Column>
                        </Row>
                    </Section>
                )}
                {audioCodecStats.items.length > 0 && (
                    <Section>
                        <SectionTitle>Audio Format</SectionTitle>
                        <Row>
                            <Column>
                                <PieChart data={audioCodecStats.items} nameFormatter={formatShort}/>
                            </Column>
                            <Column>
                                <Table data={audioCodecStats} nameFormatter={formatLong}/>
                            </Column>
                        </Row>
                    </Section>
                )}
                {subtitleCodecStats.items.length > 0 && (
                    <Section>
                        <SectionTitle>Subtitle Format</SectionTitle>
                        <Row>
                            <Column>
                                <PieChart data={subtitleCodecStats.items} nameFormatter={formatShort}/>
                            </Column>
                            <Column>
                                <Table data={subtitleCodecStats} nameFormatter={formatLong}/>
                            </Column>
                        </Row>
                    </Section>
                )}
            </>
        )
    }
}

const mapStateToProps = (state: AppState): ContentStateProps => {
    return {
        connection: state.auth.connection?.name,
        videoResolutionStats: getVideoResolutionChartData(state),
        audioCodecStats: getAudioCodecChartData(state),
        subtitleCodecStats: getSubtitleCodecChartData(state)
    }
}

export default connect<ContentStateProps>(mapStateToProps)(Stats)
