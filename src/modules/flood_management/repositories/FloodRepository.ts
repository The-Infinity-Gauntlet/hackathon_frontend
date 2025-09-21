import { injectable, inject } from 'tsyringe'
import { Api } from '@/@core/services/api'

import { BaseRepository } from '@/@templates/repositories/BaseRepository'
import { IFlood } from '../interfaces/flood'

@injectable()
export class FloodRepository extends BaseRepository<IFlood> {
    constructor(@inject('ApiService') api: Api) {
        super(api, 'flood/')
    }
}
