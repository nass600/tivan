import { ApiClient } from '..'
import { Sections } from './sections'
import { Metadata } from './metadata'

export class PMS {
    public sections: Sections
    public metadata: Metadata

    constructor (public apiClient: ApiClient) {
        this.sections = new Sections(apiClient)
        this.metadata = new Metadata(apiClient)
    }
}
