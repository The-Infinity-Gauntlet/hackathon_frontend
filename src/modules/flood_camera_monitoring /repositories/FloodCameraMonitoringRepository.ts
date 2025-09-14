import { injectable, inject } from 'tsyringe'
import { Api } from '@/@core/services/api'
import { BaseRepository } from '@/@templates/repositories/BaseRepository'
import type { ICamera } from '../interfaces/camera'
import type { IGlobalResponse } from '@/@core/interfaces/api'

@injectable()
export class FloodCameraMonitoringRepository extends BaseRepository<ICamera> {
  constructor(@inject('ApiService') api: Api) {
    // Base para câmeras, permitindo usar list()/listAll() sem concatenar manualmente
    super(api, 'flood_monitoring/cameras')
  }

  // O endpoint de câmeras é paginado (count/next/previous/ordering/results).
  // Adaptamos para IGlobalResponse e mapeamos campos para ICamera.
  async list(): Promise<IGlobalResponse<ICamera>> {
    const { data } = await this.api.get<any>(`${this.basePath}`)

    const rawResults = Array.isArray(data?.results) ? data.results : []
    const results: ICamera[] = rawResults.map((c: any) => ({
      id: c.id,
      name: c.description ?? c.name ?? 'Câmera',
      hls_url: c.video_hls ?? '',
      embed_url: c.video_embed,
      flood_percentage: 0,
      status: c.status === 'ACTIVE' ? 'Online' : (c.status ?? 'Offline'),
      link: '/cameras',
    }))

    return {
      total: Number.isFinite(data?.count) ? data.count : results.length,
      num_pages: 1,
      page_number: 1,
      page_size: results.length,
      links: { next: data?.next ?? '', previous: data?.previous ?? '' },
      results,
    }
  }
}
