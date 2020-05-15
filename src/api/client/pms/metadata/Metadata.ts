import { ApiClient, AllMediaResponse } from '../..'

export class Metadata {
    private apiClient: ApiClient

    public constructor (private client: ApiClient) {
        this.apiClient = client
    }

    get (ids: string | string[]): Promise<AllMediaResponse> {
        if (!Array.isArray(ids)) {
            ids = [ids]
        }

        return this.apiClient.get(`library/metadata/${ids.join(',')}`)
    }
}
