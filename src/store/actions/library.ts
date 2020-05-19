import { AllSectionItemsResponse, Stream, StreamType, MetadataInfo, GetMetadataResponse, VideoResolution } from '@api'
import { ThunkDispatch, ThunkAction } from 'redux-thunk'
import { AnyAction } from 'redux'
import { AppState } from '@reducers'
import BPromise from 'bluebird'
import _ from 'lodash'
import { plex } from '@sdk'
import { StatsState, initialState } from '@reducers/stats'
import { ADD_STATS, RESET_STATS } from '@actions'

const MAX_SIMULTANEOUS_DOWNLOADS = 30

const chunk = (ids: string[]): string[][][] => {
    let chunks = []

    if (ids.length > 500) {
        chunks = _.chunk(ids, 200)
    } else {
        chunks = [ids]
    }

    chunks = chunks.map((chunk) => {
        return _.chunk(chunk, 40)
    })

    return chunks
}

const extractStats = (items: MetadataInfo[]): StatsState => {
    const data: StatsState = _.cloneDeep(initialState)

    items.forEach((item: MetadataInfo) => {
        const streams = item.Media[0].Part[0].Stream

        const path = data.video.resolution
        const key: string = [
            VideoResolution.SD,
            VideoResolution.SD_576,
            VideoResolution.SD_480
        ].includes(item.Media[0].videoResolution) ? VideoResolution.SD : item.Media[0].videoResolution
        path.items[key] ? path.items[key]++ : path.items[key] = 1
        path.total++
        const summary: {[index: string]: string[]} = {
            'video.codec': [],
            'audio.codec': [],
            'audio.language': [],
            'subtitle.codec': [],
            'subtitle.language': []
        }

        streams.forEach((stream: Stream) => {
            let type = ''

            if (stream.streamType === StreamType.VIDEO) {
                type = 'video'
            } else if (stream.streamType === StreamType.AUDIO) {
                type = 'audio'
            } else if (stream.streamType === StreamType.SUBTITLE) {
                type = 'subtitle'
            }

            summary[`${type}.codec`] = _.uniq(_.concat(summary[`${type}.codec`], stream.codec))

            if (summary[`${type}.language`]) {
                summary[`${type}.language`] = _.uniq(_.concat(summary[`${type}.language`], stream.languageCode))
            }
        })

        Object.keys(summary).map((stream) => {
            const [streamType, prop] = stream.split('.')
            const path = data[streamType][prop]
            summary[stream].map((value: string) => {
                path.items[value] ? path.items[value]++ : path.items[value] = 1
            })
            path.total = path.total + summary[stream].length
        })
    })

    return data
}

export const parseLibraryAction = (): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
    async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => AppState): Promise<void> => {
        const state = getState()

        if (!state.auth.connection) {
            return Promise.reject(new Error('No token'))
        }

        plex.setBaseUrl(state.auth.connection.uri)
        plex.setAuthorization(state.auth.connection.token)

        plex.pms.sections.allSectionItems(2).then(async (data: AllSectionItemsResponse) => {
            const ids = data.MediaContainer.Metadata.map(item => item.ratingKey)

            dispatch({ type: RESET_STATS, payload: null })

            const chunks = chunk(ids)

            for (const chunk of chunks) {
                await BPromise.map(
                    chunk,
                    (items) => plex.pms.metadata.get(items),
                    { concurrency: MAX_SIMULTANEOUS_DOWNLOADS }
                ).then((result: GetMetadataResponse[]) => {
                    const items = result.reduce((acc: [], item: GetMetadataResponse) => {
                        return acc.concat(item.MediaContainer.Metadata as [])
                    }, [])
                    dispatch({ type: ADD_STATS, payload: extractStats(items) })
                })
            }
        })
    }
