import { injectable, inject } from 'tsyringe'
import { Api } from '@/@core/services/api'
import { BaseRepository } from '@/@templates/repositories/BaseRepository'
import type { FloodPredictionItem } from '../interfaces/predictions'
import type { IGlobalResponse } from '@/@core/interfaces/api'

@injectable()
export class FloodPredictionsRepository extends BaseRepository<FloodPredictionItem> {
  constructor(@inject('ApiService') api: Api) {
    super(api, 'flood_monitoring/predict/all')
  }

  async list(): Promise<IGlobalResponse<FloodPredictionItem>> {
    const { data } = await this.api.get<any>(`${this.basePath}`)

    const results: FloodPredictionItem[] = Array.isArray(data?.results) ? data.results : []

    const wrapped: IGlobalResponse<FloodPredictionItem> = {
      total: Number.isFinite(data?.count) ? data.count : results.length,
      num_pages: 1,
      page_number: 1,
      page_size: results.length,
      links: {
        next: data?.next ?? '',
        previous: data?.previous ?? '',
      },
      results,
    }
    return wrapped
  }

  // Dispara atualização síncrona do histórico de predições
  async refreshSync(): Promise<void> {
    await this.api.get(`${this.basePath}?refresh=sync`)
  }
}
