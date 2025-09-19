import type { Feature, Geometry, GeoJsonProperties } from "geojson"

export interface IFloodProps {
  polygon?: Feature<Geometry, GeoJsonProperties> | null
}

export interface IFlood {
  id: string
  city?: number
  region?: number
  neighborhood?: number
  possibility?: number
  created_at?: Date | string
  finished_at?: Date | string
  props?: IFloodProps
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
  id: string,
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