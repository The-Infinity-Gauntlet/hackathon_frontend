import { injectable, inject } from 'tsyringe'
import { Api } from '@/@core/services/api'

import { BaseRepository } from '@/@templates/repositories/BaseRepository'
import { IFlood, IFloodIA, IRegisterFloodPointPayload } from '../interfaces/flood'

@injectable()
export class FloodRepository extends BaseRepository<IFlood> {
  constructor(@inject('ApiService') api: Api) {
    super(api, 'flood/')
  }

  async registerPoint(payload: IRegisterFloodPointPayload) {
    const { data } = await this.api.post<any>('floods_point/registering/', payload)
    return data
  }

  async regionsNeighborhoods(city?: string) {
    const qs = city ? `?city=${encodeURIComponent(city)}` : ''
    const base = 'addressing/regions-neighborhoods/'
    const path = qs ? `${base}${qs}` : base
    const { data } = await this.api.get<any>(path)
    return data
  }
}

@injectable()
export class FloodIARepository extends BaseRepository<IFloodIA> {
  constructor(@inject('ApiService') api: Api) {
    super(api, 'forecast/forecasts/')
  }
}
