import { createSelector } from 'reselect'
import { AppState } from '@reducers'
import { StatsDataState } from '@reducers/stats'
import { variables } from '@styles'
import { StatsTableInfo, StatsDataItem } from '@types'

const getVideoCodecStats = (state: AppState): StatsDataState => state.stats.video.codec
const getVideoResolutionStats = (state: AppState): StatsDataState => state.stats.video.resolution
const getAudioCodecStats = (state: AppState): StatsDataState => state.stats.audio.codec
const getAudioLanguageStats = (state: AppState): StatsDataState => state.stats.audio.language
const getSubtitleCodecStats = (state: AppState): StatsDataState => state.stats.subtitle.codec
const getSubtitleLanguageStats = (state: AppState): StatsDataState => state.stats.subtitle.language

const getChartData = (stats: StatsDataState, headings: string[], palette: string[]): StatsTableInfo => {
    const items = Object.keys(stats.items).map((key): StatsDataItem => ({
        color: '',
        name: key,
        value: stats.items[key],
        proportion: (stats.items[key] * 100 / stats.total).toFixed(2)
    })).sort((a: StatsDataItem, b: StatsDataItem) => (a.value < b.value) ? 1 : -1)

    return {
        headings,
        items: items.map((item: StatsDataItem, index: number): StatsDataItem => ({
            ...item,
            color: palette[index % palette.length]
        }))
    }
}

export const getVideoCodecChartData = createSelector(
    [
        getVideoCodecStats,
        (): string[] => ['color', 'codec', 'movies', '%'],
        (): string[] => variables.palettes.blue
    ],
    getChartData
)

export const getVideoResolutionChartData = createSelector(
    [
        getVideoResolutionStats,
        (): string[] => ['color', 'resolution', 'movies', '%'],
        (): string[] => variables.palettes.blue
    ],
    getChartData
)

export const getAudioCodecChartData = createSelector(
    [
        getAudioCodecStats,
        (): string[] => ['color', 'codec', 'movies', '%'],
        (): string[] => variables.palettes.red
    ],
    getChartData
)

export const getAudioLanguageChartData = createSelector(
    [
        getAudioLanguageStats,
        (): string[] => ['color', 'language', 'movies', '%'],
        (): string[] => variables.palettes.red
    ],
    getChartData
)

export const getSubtitleCodecChartData = createSelector(
    [
        getSubtitleCodecStats,
        (): string[] => ['color', 'codec', 'movies', '%'],
        (): string[] => variables.palettes.turquoise
    ],
    getChartData
)

export const getSubtitleLanguageChartData = createSelector(
    [
        getSubtitleLanguageStats,
        (): string[] => ['color', 'language', 'movies', '%'],
        (): string[] => variables.palettes.turquoise
    ],
    getChartData
)
