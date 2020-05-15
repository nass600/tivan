import { AllMediaResponse } from '@api'
import { ThunkDispatch, ThunkAction } from 'redux-thunk'
import { AnyAction } from 'redux'
import { AppState } from '@reducers'
import BPromise from 'bluebird'
import _ from 'lodash'
import { plex } from '@sdk'

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

export const parseLibraryAction = (): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
    async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => AppState): Promise<void> => {
        const state = getState()

        if (!state.auth.connection) {
            return Promise.reject(new Error('No token'))
        }

        plex.setBaseUrl(state.auth.connection.uri)
        plex.setAuthorization(state.auth.connection.token)

        plex.pms.sections.allSectionItems(2).then(async (data: AllMediaResponse) => {
            console.log(data)
            const ids = data.MediaContainer.Metadata.map(item => item.ratingKey).slice(1, 600)

            const chunks = chunk(ids)

            for (const chunk of chunks) {
                await BPromise.map(
                    chunk,
                    (items) => plex.pms.metadata.get(items),
                    { concurrency: MAX_SIMULTANEOUS_DOWNLOADS }
                ).then((result: AllMediaResponse[]) => {
                    const items = result.reduce((acc: [], item: AllMediaResponse) => {
                        return acc.concat(item.MediaContainer.Metadata as [])
                    }, [])
                    console.log(items)
                })
            }
        })
    }
