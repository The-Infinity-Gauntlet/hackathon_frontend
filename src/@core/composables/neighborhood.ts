import { ref } from 'vue'
import * as turf from '@turf/turf'
import type {
  Geometry,
  Feature as GeoFeature,
  FeatureCollection as GeoFeatureCollection,
} from 'geojson'

type NeighborhoodFeature = GeoFeature<
  Geometry,
  { cidade?: string; bairro?: string; [k: string]: any }
>
type NeighborhoodGeoJSON = GeoFeatureCollection<Geometry, NeighborhoodFeature['properties']>

export function useNeighborhood() {
  const neighborhoods = ref<NeighborhoodGeoJSON | null>(null)
  const selectedNeighborhood = ref<string | null>(null)
  const selectedCity = ref<string | null>(null)

  async function loadNeighborhoods() {
    try {
      const response = await fetch('/neighborhood.geojson')
      neighborhoods.value = await response.json()
    } catch (error) {
      console.error('Erro ao carregar GeoJSON:', error)
    }
  }

  function getLocalization(
    lng: number,
    lat: number,
  ): { city: string; neighborhood: string } | null {
    if (!neighborhoods.value) return null

    const point = turf.point([lng, lat])

    for (const feature of neighborhoods.value.features) {
      if (turf.booleanPointInPolygon(point, feature)) {
        selectedNeighborhood.value = feature.properties.bairro ?? null
        selectedCity.value = feature.properties.cidade ?? null
        return {
          neighborhood: selectedNeighborhood.value,
          city: selectedCity.value,
        }
      }
    }

    selectedNeighborhood.value = null
    selectedCity.value = null
    return null
  }

  // Helper compatível com chamadas existentes
  function getNeighborhood(lng: number, lat: number): string | null {
    const res = getLocalization(lng, lat)
    return res?.neighborhood ?? null
  }

  return {
    neighborhoods,
    selectedNeighborhood,
    selectedCity,
    loadNeighborhoods,
    getLocalization,
    getNeighborhood,
  }
}
