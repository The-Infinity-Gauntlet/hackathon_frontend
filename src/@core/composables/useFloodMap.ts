import { useFloodIAController } from "@/modules/flood_management/controllers/FloodController"
import { computed } from "vue"
import type { FeatureCollection, Point } from 'geojson'

const today = new Date().toISOString().split("T")[0]

export function useFloodMapIa() {
    const floodIa = useFloodIAController()

    const points = computed(() => {
        return (floodIa.forecasts)
        .filter(f => {
            if (!f.date) return false
            const forecastDate = new Date(f.date).toISOString().split("T")[0]
            return forecastDate === today
        })
        .map(f => ({
            id: f.id,
            lat: f.latitude,
            lon: f.longitude,
            intensity: f.probability ?? 0
        }))
    })

    const init = async () => {
        if (!floodIa.forecasts.length) {
            await floodIa.getForecasts()
        }
    }

    const toGeoJson = (): FeatureCollection<Point, { intensity: number }> => {
        return {
            type: "FeatureCollection",
            features: points.value.map((p) => {
                return {
                    type: "Feature",
                    geometry: {
                        type: "Point",
                        coordinates: [p.lon, p.lat],
                    },
                    properties: {
                        intensity: p.intensity,
                    }
                }
            })
        }
    }

    return {
        points,
        init,
        toGeoJson,
        loading: floodIa.loading
    }
}