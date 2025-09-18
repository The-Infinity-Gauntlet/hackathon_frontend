import { injectable, inject } from 'tsyringe'
import { Api } from '@/@core/services/api'
import { BaseRepository } from '@/@templates/repositories/BaseRepository'

interface DemoResponse {
  ok: boolean
  hls_url: string
}

@injectable()
export class FloodDemoRepository extends BaseRepository<any> {
  constructor(@inject('ApiService') api: Api) {
    super(api, 'flood_monitoring/demo')
  }

  private _getPromise: Promise<string> | null = null
  private _predictPromise: Promise<any> | null = null

  async get(): Promise<string> {
    if (this._getPromise) return this._getPromise
    this._getPromise = (async () => {
      const { data } = await this.api.get<DemoResponse>(`${this.basePath}`)
      if (!data || typeof data.hls_url !== 'string') {
        throw new Error('Resposta inválida do demo (hls_url ausente)')
      }
      const raw = data.hls_url || ''
      // Em dev, roteia via proxy /hls para evitar CORS e bloqueios
      // Aceita IPs locais comuns (192.168.x.x, 10.x.x.x) e hostname configurável
      const hlsTarget = (import.meta as any)?.env?.VITE_HLS_TARGET as string | undefined
      const targetHost = hlsTarget ? hlsTarget.replace(/^https?:\/\//i, '') : '192.168.7.10:8000'
      const ipPattern =
        /^(https?:\/\/)(?:localhost:\d+|127\.0\.0\.1:\d+|10\.\d+\.\d+\.\d+:\d+|192\.168\.\d+\.\d+:\d+|\[::1\]:\d+|[a-zA-Z0-9.-]+:\d+)/

      // Já proxied?
      if (raw.startsWith('/hls/')) return raw

      // Se for a partir do target configurado ou IP local, reescreve para /hls
      try {
        const url = new URL(raw)
        if (url.host === targetHost || ipPattern.test(raw)) {
          return `/hls${url.pathname}${url.search}${url.hash}`
        }
      } catch {
        // raw pode não ser uma URL absoluta; mantém como está
      }
      // fallback
      return raw
    })()
    try {
      const url = await this._getPromise
      return url
    } finally {
      this._getPromise = null
    }
  }

  async predictDemo(): Promise<any> {
    if (this._predictPromise) return this._predictPromise
    this._predictPromise = (async () => {
      const { data } = await this.api.get<any>('flood_monitoring/demo/predict')
      if (!data) throw new Error('Resposta vazia do endpoint de predição do demo')
      return data
    })()
    try {
      const res = await this._predictPromise
      return res
    } finally {
      this._predictPromise = null
    }
  }
}
