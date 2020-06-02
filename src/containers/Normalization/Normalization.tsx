import React from 'react'
import { connect } from 'react-redux'
import { AppState } from '@reducers'
import { MediaState } from '@reducers/library'
import { Title, Section, SectionTitle, Row, Column, Table, PieChart, MediaList } from '@components'
import { StatsDataItem } from '@types'
import { getNormalizationChartData } from '@selectors'

interface ContentStateProps {
    connection?: string;
    movies: MediaState[];
    normalizationStats: StatsDataItem[];
}

class Normalization extends React.Component<ContentStateProps, {}> {
    render (): React.ReactNode {
        const { connection, movies, normalizationStats } = this.props
        const normalizationRules = {
            headings: ['#', 'rule'],
            items: [
                {
                    position: 1,
                    rule: 'Video track must have a resolution equal or greater than 1080p'
                },
                {
                    position: 2,
                    rule: 'All audio tracks must be encoded in AC-3'
                },
                {
                    position: 3,
                    rule: 'All subtitle tracks must be encoded in SRT'
                },
                {
                    position: 4,
                    rule: 'File size must not be greater than 7 GB'
                },
                {
                    position: 5,
                    rule: 'File type must be Matroska (.mkv)'
                }
            ]
        }

        return (
            <>
                <Title>{connection} - Normalization</Title>
                <Section>
                    <Row>
                        <Column>
                            <p>
                                Despite Plex <strong>Client</strong> applications work in pretty much every well-known
                                device, the media playing might be performed differently depending on the device trying
                                to play such content.
                                For instance, you might find yourself trying to play a .mkv file with a DTS encoded
                                audio track in your Apple TV and, every couple of seconds a spinner appears because
                                the movie is buffering (Direct Streaming or transcoding) while maybe, playing the
                                same item in your Android phone has no interruption at all as the format is fully
                                supported to Direct Play it.
                            </p>
                            <p>
                                This happens, among other things, because of the lack of support of the media file
                                container (.mkv, .avi...) and the codec used in the tracks contained in it by the
                                client device playing the given content. Although Plex provides its own media
                                player embedded in every Client application, the more standard and well-supported
                                codecs your media files are using, the fewer problems you will encounter while
                                playing them as a rule of thumb.
                            </p>
                            <p>
                                The standardization of what a media file should contain in terms of
                                video/audio/subtitle tracks, codecs used and file extension is what we
                                call <strong>Normalization</strong> and we we will help you keep it that way in
                                this section.
                            </p>
                        </Column>
                    </Row>
                </Section>
                <Section>
                    <SectionTitle>Status</SectionTitle>
                    <Row>
                        <Column>
                            <p>
                                The below table depicts what a media file should contain in order to be considered
                                normalized:
                            </p>
                            <Table data={normalizationRules}/>
                        </Column>
                        <Column>
                            <PieChart data={normalizationStats}/>
                        </Column>
                    </Row>
                </Section>
                <Section>
                    <SectionTitle>Non-normalized list</SectionTitle>
                    <Row>
                        <Column>
                            {movies.length > 0 && (
                                <>
                                    <p>
                                        Below you can find the list of non-normalized items we found in your library.
                                    </p>
                                    <MediaList items={movies}/>
                                </>
                            )}
                        </Column>
                    </Row>
                </Section>
            </>
        )
    }
}

const mapStateToProps = (state: AppState): ContentStateProps => {
    return {
        connection: state.auth.connection?.name,
        movies: state.library[2].normalization || [],
        normalizationStats: getNormalizationChartData(state)
    }
}

export default connect<ContentStateProps>(mapStateToProps)(Normalization)
