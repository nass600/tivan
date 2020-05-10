import React from 'react'
import { connect } from 'react-redux'
import { AppState } from '@reducers'
import { PieChart, Table, Section, Column, Row, Title, SectionTitle } from '@components'

interface ContentStateProps {
    connection?: string;
}

class Stats extends React.Component<ContentStateProps, {}> {
    render (): React.ReactNode {
        const statsVideoResolution = {
            headings: ['color', 'resolution', 'movies', '%'],
            items: [
                { color: '#58b4ae', name: '1080p', value: 1300, proportion: 78.74 },
                { color: '#ffe277', name: '720p', value: 300, proportion: 18.17 },
                { color: '#ffb367', name: 'SD', value: 50, proportion: 3.03 },
                { color: '#ffe2bc', name: '4K', value: 1, proportion: 0.06 }
            ]
        }
        const statsAudioFormat = {
            headings: ['color', 'format', 'movies', '%'],
            items: [
                { color: '#f1e3cb', name: 'AC3', value: 1800, proportion: 87.38 },
                { color: '#f9b384', name: 'AAC', value: 250, proportion: 12.14 },
                { color: '#ca5116', name: 'MP3', value: 10, proportion: 0.49 }
            ]
        }
        const statsSubtitleFormat = {
            headings: ['color', 'format', 'movies', '%'],
            items: [
                { color: '#f4f4f4', name: 'SRT', value: 2100, proportion: 73.43 },
                { color: '#8ec6c5', name: 'ASS', value: 550, proportion: 19.23 },
                { color: '#6983aa', name: 'VobSub', value: 210, proportion: 7.34 }
            ]
        }
        const { connection } = this.props

        return (
            <>
                <Title>{connection} - Stats</Title>
                <Section>
                    <SectionTitle>Video Resolution</SectionTitle>
                    <Row>
                        <Column>
                            <PieChart data={statsVideoResolution.items}/>
                        </Column>
                        <Column>
                            <Table data={statsVideoResolution}/>
                        </Column>
                    </Row>
                </Section>
                <Section>
                    <SectionTitle>Audio Format</SectionTitle>
                    <Row>
                        <Column>
                            <PieChart data={statsAudioFormat.items}/>
                        </Column>
                        <Column>
                            <Table data={statsAudioFormat}/>
                        </Column>
                    </Row>
                </Section>
                <Section>
                    <SectionTitle>Subtitle Format</SectionTitle>
                    <Row>
                        <Column>
                            <PieChart data={statsSubtitleFormat.items}/>
                        </Column>
                        <Column>
                            <Table data={statsSubtitleFormat}/>
                        </Column>
                    </Row>
                </Section>
            </>
        )
    }
}

const mapStateToProps = (state: AppState): ContentStateProps => {
    return {
        connection: state.auth.connection?.name
    }
}

export default connect<ContentStateProps>(mapStateToProps)(Stats)
