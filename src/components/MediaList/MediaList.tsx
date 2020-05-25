import React from 'react'
import { MediaState } from '@reducers/library'
import { Table } from '@components'
import { AudioStream, SubtitleStream, Stream, StreamType } from '@api'
import { formatSize } from '@utils/name-formatter'

interface MediaListProps {
    items: MediaState[];
}

class MediaList extends React.Component<MediaListProps> {
    render (): React.ReactNode {
        const { items } = this.props
        console.log(items)
        const data = {
            headings: ['title', 'file', 'video', 'audio', 'subtitle', 'errors'],
            items: items.map((item: MediaState) => {
                return {
                    title: `${item.title} (${item.year})`,
                    file: (
                        <>
                            <li key={0}>{`Type:  .${item.fileType}`}</li>
                            <li key={1}>{`Size:  ${formatSize(item.size)}`}</li>
                        </>
                    ),
                    video: item.tracks.map((track: Stream, index: number) => {
                        if (track.streamType === StreamType.VIDEO) {
                            return (<li key={index}>{`[${track.index}] ${track.displayTitle}`}</li>)
                        }
                    }),
                    audio: item.tracks.map((track: AudioStream, index: number) => {
                        if (track.streamType === StreamType.AUDIO) {
                            return (
                                <li key={index}>
                                    {`[${track.index}] ${track.displayTitle}${track.forced ? ' [forced]' : ''}`}
                                </li>
                            )
                        }
                    }),
                    subtitle: item.tracks.map((track: SubtitleStream, index: number) => {
                        if (track.streamType === StreamType.SUBTITLE) {
                            return (<li key={index}>{`[${track.index}] ${track.displayTitle}`}</li>)
                        }
                    }),
                    errors: item.normalizationErrors.map((error: string, index: number) => (
                        <li key={index}>{error}</li>
                    ))
                }
            })
        }

        return (
            <>
                <Table data={data}/>
            </>
        )
    }
}

export default MediaList
