import { injectable, inject } from 'tsyringe'
import { Api } from '@/@core/services/api'

import { BaseRepository } from '@/@templates/repositories/BaseRepository'
import { IFlood } from '../interfaces/flood'

@injectable()
export class FloodRepository extends BaseRepository<IFlood> {
    constructor(@inject('ApiService') api: Api) {
        super(api, 'flood/')
    }

    /**
     * Registers a new flood point with coordinates and form data
     * @param payload - Form data from the registration form
     * @returns Promise with the registered flood point response
     */
    async registerFloodPoint(payload: Record<string, any>): Promise<any> {
        const { data } = await this.api.post('floods_point/registering/', payload)
        return data
    }
}
