import * as uuid from 'uuid'
import axios from 'axios'

type LoginResponse = string;

const login = (username: string, password: string): Promise<LoginResponse> => {
    const hash = Buffer.from(`${username}:${password}`).toString('base64')

    return axios.post(
        'https://plex.tv/users/sign_in.json',
        { username, password },
        {
            headers: {
                'X-Plex-Client-Identifier': uuid.v4(),
                'X-Plex-Device': 'Chrome',
                'X-Plex-Product': 'Tivan',
                'X-Plex-Version': '1.0.0',
                authorization: `Basic ${hash}`
            }
        }
    ).then(({ data }) => (
        data.user.authToken
    ))
}

export {
    LoginResponse,
    login
}
