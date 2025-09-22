import { injectable, inject } from 'tsyringe'
import { Api } from '@/@core/services/api'

import { BaseRepository } from '@/@templates/repositories/BaseRepository'
import { IFlood, IFloodIA } from '../interfaces/flood'

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

    /**
     * Retrieves all flood points
     * @returns Promise with the list of flood points
     */
    async getFloodPoints(): Promise<IFlood[]> {
        const { data } = await this.api.get('floods_point/registering/')
        console.log(data)
        return data
    }
}

@injectable()
export class FloodIARepository extends BaseRepository<IFloodIA> {
    constructor(@inject('ApiService') api: Api) {
        super(api, 'forecast/forecasts/')
    }
}
