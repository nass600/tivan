import { createSelector } from 'reselect'
import { AppState } from '@reducers'
import { LibraryState, LibrariesState, StatsType } from '@reducers/library'
import { variables } from '@styles'
import { StatsDataItem } from '@types'

const getLibraries = (state: AppState): LibrariesState => state.library
const getCurrentLibraryId = (state: AppState): number | null => state.status.currentLibrary

const getChartData = (library: LibraryState, statsName: StatsType, palette: string[]): StatsDataItem[] => {
    const stats = library?.stats[statsName]

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

export const getCurrentLibrary = createSelector(
    [getCurrentLibraryId, getLibraries],
    (currentLibraryId: number | null, libraries: LibrariesState): LibraryState | null => {
        if (currentLibraryId === null) {
            return null
        }

        return libraries[currentLibraryId]
    }
)

export const getVideoCodecChartData = createSelector(
    [getCurrentLibrary, (): StatsType => StatsType.VIDEO_CODEC, (): string[] => variables.palettes.green],
    getChartData
)

export const getVideoResolutionChartData = createSelector(
    [getCurrentLibrary, (): StatsType => StatsType.VIDEO_RESOLUTION, (): string[] => variables.palettes.blue],
    getChartData
)

export const getAudioCodecChartData = createSelector(
    [getCurrentLibrary, (): StatsType => StatsType.AUDIO_CODEC, (): string[] => variables.palettes.red],
    getChartData
)

export const getAudioLanguageChartData = createSelector(
    [getCurrentLibrary, (): StatsType => StatsType.AUDIO_LANGUAGE, (): string[] => variables.palettes.red],
    getChartData
)

export const getSubtitleCodecChartData = createSelector(
    [getCurrentLibrary, (): StatsType => StatsType.SUBTITLE_CODEC, (): string[] => variables.palettes.turquoise],
    getChartData
)

export const getSubtitleLanguageChartData = createSelector(
    [getCurrentLibrary, (): StatsType => StatsType.SUBTITLE_LANGUAGE, (): string[] => variables.palettes.turquoise],
    getChartData
)

export const getNormalizationChartData = createSelector(
    [getCurrentLibrary, (): StatsType => StatsType.NORMALIZATION, (): string[] => variables.palettes.turquoise],
    getChartData
)
