export interface ICamera {
  id: string
  name: string
  url: string
  embed_url?: string
  flood_percentage: number
  status: string
  link: string
}

export interface HlsOptions {
  autoplay?: boolean
  muted?: boolean
  controls?: boolean
  playsinline?: boolean
  poster?: string
  lockToLive?: boolean
  liveDelay?: number
  maxDelaySec?: number
}
