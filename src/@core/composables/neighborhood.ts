import { ref } from 'vue'
import * as turf from '@turf/turf'

interface BairroFeature {
  type: 'Feature'
  properties: {
    name: string
    [key: string]: any
  }
  geometry: turf.Geometry
}

interface BairroGeoJSON {
  type: 'FeatureCollection'
  features: BairroFeature[]
}

export function useBairro() {
  const bairros = ref<BairroGeoJSON | null>(null)
  const selectedBairro = ref<string | null>(null)

  /**
   * Carrega o GeoJSON do public
   */
  async function loadBairros() {
    try {
      const response = await fetch('/neighborhood.geojson')
      bairros.value = await response.json()
    } catch (error) {
      console.error('Erro ao carregar GeoJSON:', error)
    }
  }

  /**
   * Retorna o nome do bairro a partir das coordenadas
   */
  function getBairro(lng: number, lat: number): string | null {
    if (!bairros.value) return null

    const point = turf.point([lng, lat])

    for (const feature of bairros.value.features) {
      if (turf.booleanPointInPolygon(point, feature)) {
        selectedBairro.value = feature.properties.bairro
        return selectedBairro.value
      }
    }

    selectedBairro.value = null
    return null
  }

  return {
    bairros,
    selectedBairro,
    loadBairros,
    getBairro,
  }
}
