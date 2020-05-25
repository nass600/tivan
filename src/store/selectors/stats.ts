import { createSelector } from 'reselect'
import { AppState } from '@reducers'
import { StatsDataState } from '@reducers/library'
import { variables } from '@styles'
import { StatsDataItem } from '@types'

const getVideoCodecStats = (state: AppState): StatsDataState => state.library[2]?.stats.videoCodec
const getVideoResolutionStats = (state: AppState): StatsDataState => state.library[2]?.stats.videoResolution
const getAudioCodecStats = (state: AppState): StatsDataState => state.library[2]?.stats.audioCodec
const getAudioLanguageStats = (state: AppState): StatsDataState => state.library[2]?.stats.audioLanguage
const getSubtitleCodecStats = (state: AppState): StatsDataState => state.library[2]?.stats.subtitleCodec
const getSubtitleLanguageStats = (state: AppState): StatsDataState => state.library[2]?.stats.subtitleLanguage

const getChartData = (stats: StatsDataState, palette: string[]): StatsDataItem[] => {
    if (!stats) {
        return []
    }

    const items = Object.keys(stats.items).map((key): StatsDataItem => ({
        color: '',
        name: key,
        value: stats.items[key],
        proportion: (stats.items[key] * 100 / stats.total).toFixed(2)
    })).sort((a: StatsDataItem, b: StatsDataItem) => (a.value < b.value) ? 1 : -1)

    return items.map((item: StatsDataItem, index: number): StatsDataItem => ({
        ...item,
        color: palette[index % palette.length]
    }))
}

export const getVideoCodecChartData = createSelector(
    [
        getVideoCodecStats,
        (): string[] => variables.palettes.blue
    ],
    getChartData
)

export const getVideoResolutionChartData = createSelector(
    [
        getVideoResolutionStats,
        (): string[] => variables.palettes.blue
    ],
    getChartData
)

export const getAudioCodecChartData = createSelector(
    [
        getAudioCodecStats,
        (): string[] => variables.palettes.red
    ],
    getChartData
)

export const getAudioLanguageChartData = createSelector(
    [
        getAudioLanguageStats,
        (): string[] => variables.palettes.red
    ],
    getChartData
)

export const getSubtitleCodecChartData = createSelector(
    [
        getSubtitleCodecStats,
        (): string[] => variables.palettes.turquoise
    ],
    getChartData
)

export const getSubtitleLanguageChartData = createSelector(
    [
        getSubtitleLanguageStats,
        (): string[] => variables.palettes.turquoise
    ],
    getChartData
)
