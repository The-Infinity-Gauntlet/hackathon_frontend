import { ref } from 'vue'
import * as turf from '@turf/turf'

interface NeighborhoodFeature {
  type: 'Feature'
  properties: {
    name: string
    [key: string]: any
  }
  geometry: turf.Geometry
}

interface NeighborhoodGeoJSON {
  type: 'FeatureCollection'
  features: NeighborhoodFeature[]
}

export function useNeighborhood() {
  const neighborhoods = ref<NeighborhoodGeoJSON | null>(null)
  const selectedNeighborhood = ref<string | null>(null)

  async function loadNeighborhoods() {
    try {
      const response = await fetch('/neighborhood.geojson')
      neighborhoods.value = await response.json()
    } catch (error) {
      console.error('Erro ao carregar GeoJSON:', error)
    }
  }

  function getNeighborhood(lng: number, lat: number): string | null {
    if (!neighborhoods.value) return null

    const point = turf.point([lng, lat])

    for (const feature of neighborhoods.value.features) {
      if (turf.booleanPointInPolygon(point, feature)) {
        selectedNeighborhood.value = feature.properties.bairro
        return selectedNeighborhood.value
      }
    }

    selectedNeighborhood.value = null
    return null
  }

  return {
    neighborhoods,
    selectedNeighborhood,
    loadNeighborhoods,
    getNeighborhood,
  }
}
