import type { Feature, Geometry, GeoJsonProperties } from 'geojson'

export interface IFlood {
  id: string
  city?: string
  region?: string
  neighborhood?: string
  possibility?: number
  createdAt?: Date
  finishedAt?: Date
  polygon?: Feature<Geometry, GeoJsonProperties> | null
}

export interface IFloodControllerState {
  floods: IFlood[]
  currentFlood: Partial<IFlood>
  pagination: {
    page: number
    pageSize: number
    offset: number
    limit: number
  }
  polygon: Feature<Geometry, GeoJsonProperties> | null
  loading: boolean
  search: string
}

export interface IFloodIA {
  id: string
  latitude: number
  longitude: number
  date: Date
  flood: number
  probability: number
}

export interface IFloodIAControllerState {
  forecasts: IFloodIA[]
  currentForecast: Partial<IFloodIA>
  pagination: {
    page: number
    pageSize: number
    offset: number
    limit: number
  }
  loading: boolean
  search: string
}

export interface IRegisterFloodPointPayload {
  city: string
  region: string
  neighborhood: string
  possibility: number
  created_at: string
  finished_at: string
  props: Record<string, any>
}
