import { injectable, inject } from 'tsyringe'
import { Api } from '@/@core/services/api'

import { BaseRepository } from '@/@templates/repositories/BaseRepository'
import { IFlood, IFloodIA } from '../interfaces/flood'

@injectable()
export class FloodRepository extends BaseRepository<IFlood> {
  constructor(@inject('ApiService') api: Api) {
    super(api, 'flood/')
  }
}

@injectable()
export class FloodIARepository extends BaseRepository<IFloodIA> {
  constructor(@inject('ApiService') api: Api) {
    super(api, 'forecast/forecasts/')
  }
}