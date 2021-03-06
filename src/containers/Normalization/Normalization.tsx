import React from 'react'
import { connect } from 'react-redux'
import { AppState } from '@reducers'
import { LibraryState } from '@reducers/library'
import { Heading2, Section, Heading4, Row, Column, Table, PieChart, MediaList, Error, Badge } from '@components'
import { StatsDataItem } from '@types'
import { getNormalizationChartData, getCurrentLibrary } from '@selectors'
import { MdErrorOutline } from 'react-icons/md'
import styled from 'styled-components'
import { variables } from '@styles'

const Title = styled(Heading2)`
    ${Badge} {
        margin-left: ${variables.spacing.l};
    }
`

interface NormalizationStateProps {
    connection?: string;
    currentLibrary: LibraryState | null;
    normalizationStats: StatsDataItem[];
}

class Normalization extends React.Component<NormalizationStateProps, {}> {
    render (): React.ReactNode {
        const { connection, currentLibrary, normalizationStats } = this.props
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
                {(!currentLibrary || currentLibrary.normalization.length === 0) && (
                    <Error title="No normalization data found" icon={MdErrorOutline}>
                        <p>
                            It seems there are no normalization data recorded for the
                            library <strong>{currentLibrary?.title}</strong>
                        </p>
                    </Error>
                )}
                {currentLibrary && currentLibrary.normalization.length > 0 && (
                    <>
                        <Title>
                            <span>{connection} &mdash; Normalization</span>
                            <Badge>{currentLibrary?.totalItems}</Badge>
                        </Title>
                        <Section>
                            <Row>
                                <Column>
                                    <p>
                                        Despite Plex <strong>Client</strong> applications work in pretty much every
                                        well-known device, the media playing might be performed differently depending
                                        on the device trying to play such content.
                                        For instance, you might find yourself trying to play a .mkv file with a DTS
                                        encoded audio track in your Apple TV and, every couple of seconds a spinner
                                        appears because the movie is buffering (Direct Streaming or transcoding) while
                                        maybe, playing the same item in your Android phone has no interruption at all
                                        as the format is fully supported to Direct Play it.
                                    </p>
                                    <p>
                                        This happens, among other things, because of the lack of support of the media
                                        file container (.mkv, .avi...) and the codec used in the tracks contained in
                                        it by the client device playing the given content. Although Plex provides its
                                        own media player embedded in every Client application, the more standard and
                                        well-supported codecs your media files are using, the fewer problems you will
                                        encounter while playing them as a rule of thumb.
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
                            <Heading4>Status</Heading4>
                            <Row>
                                <Column>
                                    <p>
                                        The below table depicts what a media file should contain in order to be
                                        considered normalized:
                                    </p>
                                    <Table data={normalizationRules}/>
                                </Column>
                                <Column>
                                    <PieChart data={normalizationStats}/>
                                </Column>
                            </Row>
                        </Section>
                        <Section>
                            <Heading4>Non-normalized list</Heading4>
                            <Row>
                                <Column>
                                    {currentLibrary.normalization.length > 0 && (
                                        <>
                                            <p>
                                                Below you can find the list of non-normalized items we found in your
                                                library.
                                            </p>
                                            <MediaList items={currentLibrary.normalization}/>
                                        </>
                                    )}
                                </Column>
                            </Row>
                        </Section>
                    </>
                )}
            </>
        )
    }
}

const mapStateToProps = (state: AppState): NormalizationStateProps => {
    return {
        connection: state.auth.connection?.name,
        currentLibrary: getCurrentLibrary(state),
        normalizationStats: getNormalizationChartData(state)
    }
}

export default connect<NormalizationStateProps>(mapStateToProps)(Normalization)
