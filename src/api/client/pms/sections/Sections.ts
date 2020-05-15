import { ApiClient } from '../..'

export enum SectionType {
    MOVIE = 'movie',
    SHOW = 'show',
    PHOTO = 'photo'
}

export interface AllSectionsResponse {
    MediaContainer: {
        size: number;
        allowSync: boolean;
        identifier: string;
        mediaTagPrefix: string;
        mediaTagVersion: number;
        title1: string;
        Directory: {
            type: SectionType;
            Location: {
                id: number;
                path: string;
            }[];
        }[];
    };
}

export enum VideoCodec {
    H264 = 'h264'
}

export enum AudioCodec {
    AC3 = 'ac3'
}

type Codec = VideoCodec | AudioCodec

export enum VideoResolution {
    SD = 'sd',
    HD = '720',
    FHD = '1080',
    '4K' = '4k'
}

export enum MediaContainer {
    MKV = 'mkv',
    AVI = 'avi'
}

export enum StreamType {
    VIDEO = 1,
    AUDIO = 2,
    SUBTITLE = 3
}

export interface VideoStream {
    id: number;
    streamType: StreamType;
    default: boolean;
    codec: VideoCodec;
    index: number;
    bitrate: number;
    language: string;
    languageCode: string;
    bitDepth: number;
    chromaLocation: string;
    chromaSubsampling: string;
    frameRate: number;
    hasScalingMatrix: boolean;
    height: number;
    level: number;
    profile: string;
    refFrames: number;
    scanType: string;
    width: number;
    displayTitle: string;
}

export interface AudioStream {
    id: number;
    streamType: StreamType;
    selected: boolean;
    default: boolean;
    codec: AudioCodec;
    index: number;
    channels: number;
    bitrate: number;
    language: string;
    languageCode: string;
    audioChannelLayout: string;
    samplingRate: number;
    displayTitle: string;
}

export interface SubtitleStream {
    id: number;
    streamType: StreamType;
    codec: AudioCodec;
    index: number;
    bitrate: number;
    language: string;
    languageCode: string;
    displayTitle: string;
}

type Stream = VideoStream | AudioStream | SubtitleStream;

export interface AllMediaResponse {
    MediaContainer: {
        size: number;
        title1: string;
        Metadata: {
            ratingKey: string;
            key: string;
            guid: string;
            studio: string;
            type: SectionType;
            title: string;
            titleSort: string;
            originalTitle: string;
            summary: string;
            rating: number;
            viewCount: number;
            lastViewedAt: number;
            year: number;
            thumb: string;
            art: string;
            duration: number;
            originallyAvailableAt: string;
            addedAt: number;
            updatedAt: number;
            Media: {
                id: number;
                duration: number;
                bitrate: number;
                width: number;
                height: number;
                aspectRatio: number;
                audioChannels: number;
                audioCodec: AudioCodec;
                videoCodec: VideoCodec;
                videoResolution: VideoResolution;
                container: MediaContainer;
                videoFrameRate: string;
                videoProfile: string;
                Part: {
                    id: number;
                    key: string;
                    duration: number;
                    file: string;
                    size: number;
                    container: MediaContainer;
                    videoProfile: string;
                    Stream: Stream[];
                }[];
            }[];
        }[];
    };
}

export class Sections {
    private apiClient: ApiClient

    public constructor (private client: ApiClient) {
        this.apiClient = client
    }

    all (): Promise<AllSectionsResponse> {
        return this.apiClient.get('library/sections')
    }

    allSectionItems (sectionId: number): Promise<AllMediaResponse> {
        return this.apiClient.get(`library/sections/${sectionId}/all`)
    }
}
