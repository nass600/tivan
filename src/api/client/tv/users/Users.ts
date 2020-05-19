import { ApiClient } from '../..'

export interface User {
    id: number;
    uuid: string;
    email: string;
    joined_at: string;
    username: string;
    title: string;
    thumb: string;
    hasPassword: boolean;
    authToken: string;
    authentication_token: string;
    subscription: {
        active: true;
        status: string;
        plan: string;
        features: string[];
    };
    roles: {
        roles: string[];
    };
    entitlements: string[];
    confirmedAt: string;
    forumId: number;
    rememberMe: boolean;
}

export interface LoginResponse {
    user: User;
}

export class Users {
    private apiClient: ApiClient

    public constructor (private client: ApiClient) {
        this.apiClient = client
    }

    signIn (username: string, password: string): Promise<LoginResponse> {
        const hash = Buffer.from(`${username}:${password}`).toString('base64')

        return this.apiClient.post(
            'users/sign_in.json',
            { username, password },
            undefined,
            {
                authorization: `Basic ${hash}`
            }
        )
    }
}
