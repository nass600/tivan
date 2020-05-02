import axios from 'axios'
import * as app from '../../package.json'

export type LoginResponse = string;

export const login = (username: string, password: string, clientId: string): Promise<LoginResponse> => {
    const hash = Buffer.from(`${username}:${password}`).toString('base64')

    return axios.post(
        'https://plex.tv/users/sign_in.json',
        { username, password },
        {
            headers: {
                'X-Plex-Client-Identifier': clientId,
                'X-Plex-Device': 'Chrome',
                'X-Plex-Product': 'Tivan',
                'X-Plex-Version': app.version,
                authorization: `Basic ${hash}`
            }
        }
    ).then(({ data }) => (
        data.user.authToken
    ))
}

export interface Connection {
    protocol: string;
    address: string;
    port: number;
    uri: string;
    local: boolean;
    relay: boolean;
    IPv6: boolean;
}

export interface Resource {
    name: string;
    clientIdentifier: string;
    accessToken: string | null;
    connections: Connection[];
}

export type ResourcesApiRespone = Resource[]

export const getResources = (token: string, clientId: string): Promise<ResourcesApiRespone> => {
    return axios.get(
        'https://plex.tv/api/v2/resources',
        {
            headers: {
                Accept: 'application/json',
                'X-Plex-Token': token,
                'X-Plex-Client-Identifier': clientId
            }
        }
    ).then(({ data }) => (
        data
    ))
}
