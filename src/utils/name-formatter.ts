import { VideoResolution, VideoCodec, AudioCodec, SubtitleCodec } from '@api'

const map: {[x: string]: string[]} = {
    [VideoResolution.SD]: ['SD', 'SD (≤ 576p)'],
    [VideoResolution.HD_720]: ['720p', 'HD (720p)'],
    [VideoResolution.FHD_1080]: ['1080p', 'Full HD (1080p)'],
    [VideoResolution.UHD_4K]: ['4K', 'Ultra HD (4K)'],
    [VideoCodec.H264]: ['H.264', 'H.264 (Advanced Video Coding)'],
    [VideoCodec.MPEG4]: ['MPEG-4', 'MPEG-4'],
    [VideoCodec.HEVC]: ['HEVC', 'H.265 (High Efficiency Video Coding)'],
    [VideoCodec.MSMPEG4V3]: ['MS MPEG-4 v3', 'Microsoft MPEG-4 v3'],
    [VideoCodec.MPEG1VIDEO]: ['MPEG-1', 'MPEG-1'],
    [VideoCodec.MPEG2VIDEO]: ['MPEG-2 ', 'MPEG-2'],
    [VideoCodec.VC1]: ['VC-1', 'VC-1'],
    [AudioCodec.AC3]: ['AC-3', 'Dolby Digital (Dolby AC-3)'],
    [AudioCodec.DCA]: ['DTS', 'DTS'],
    [AudioCodec.MP3]: ['MP3', 'MP3'],
    [AudioCodec.AAC]: ['AAC', 'Advanced Audio Coding (AAC)'],
    [AudioCodec.EAC3]: ['E-AC-3', 'Dolby Digital Plus (Enhanced AC-3)'],
    [AudioCodec.VORBIS]: ['Vorbis', 'Vorbis (Ogg)'],
    [AudioCodec.MP2]: ['MP2', 'MP2'],
    [AudioCodec.TRUEHD]: ['TrueHD', 'Dolby TrueHD'],
    [SubtitleCodec.SRT]: ['SRT', 'SubRip (SRT)'],
    [SubtitleCodec.VOBSUB]: ['VobSub', 'VobSub'],
    [SubtitleCodec.SSA]: ['SSA', 'SubStation Alpha (SSA)'],
    [SubtitleCodec.ASS]: ['ASS', 'Advanced SubStation Alpha (ASS)'],
    [SubtitleCodec.PGS]: ['PGS', 'Presentation Graphic Stream (PGS)'],
    [SubtitleCodec.EIA608]: ['EIA-608', 'EIA-608']
}

export const formatShort = (item: string): string => {
    if (map[item]) {
        return map[item][0]
    }

    return item
}

export const formatLong = (item: string): string => {
    if (map[item]) {
        return map[item][1]
    }

    return item
}

const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB']

export const formatSize = (x: number): string => {
    let l = 0
    let n = x || 0

    while (n >= 1024 && ++l) {
        n = n / 1024
    }

    return (n.toFixed(n < 10 && l > 0 ? 2 : 0) + ' ' + units[l])
}
