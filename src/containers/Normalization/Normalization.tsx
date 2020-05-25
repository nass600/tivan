import React from 'react'
import { connect } from 'react-redux'
import { AppState } from '@reducers'
import { MediaState } from '@reducers/library'
import { Title, Section, SectionTitle, Row, Column, Table, MediaList } from '@components'

interface ContentStateProps {
    connection?: string;
    movies: MediaState[];
}

class Normalization extends React.Component<ContentStateProps, {}> {
    render (): React.ReactNode {
        const { connection, movies } = this.props
        const data = {
            headings: ['track', 'track type', 'criteria', 'language'],
            items: [
                {
                    track: 1,
                    type: 'video',
                    criteria: '1080p resolution',
                    language: ''
                },
                {
                    track: 2,
                    type: 'audio',
                    criteria: 'AC-3 codec',
                    language: 'esp'
                },
                {
                    track: 3,
                    type: 'audio',
                    criteria: 'AC-3 codec',
                    language: 'eng'
                },
                {
                    track: 4,
                    type: 'subtitle',
                    criteria: 'SRT codec',
                    language: 'esp'
                },
                {
                    track: 5,
                    type: 'subtitle',
                    criteria: 'SRT codec',
                    language: 'eng'
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
                        <Column>
                            <Table data={data}/>
                        </Column>
                    </Row>
                    <ul>

                    </ul>
                </Section>
                <Section>
                    <SectionTitle>Non-normalized movies</SectionTitle>
                    <Row>
                        <Column>
                            {movies.length > 0 && <MediaList items={movies}/>}
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
        movies: state.library[2].normalization || []
    }
}

export default connect<ContentStateProps>(mapStateToProps)(Normalization)
