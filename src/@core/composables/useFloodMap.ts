import { ref, computed } from 'vue'
import type { Feature, FeatureCollection, Point } from 'geojson'
import { container } from 'tsyringe'
import { useFloodIAController } from '@/modules/flood_management/controllers/FloodController'
import { FloodRepository } from '@/modules/flood_management/repositories/FloodRepository'

export type FloodPoint = {
  id: string
  lat: number
  lng: number
  neighborhood: string
  city?: string | null
  probability: number // 0-100
  duration: string // e.g. "30 min"
  source: 'offline' | 'backend'
  createdAt: string
}

const OFFLINE_KEY = 'offlineFloodPoints'

function loadOffline(): FloodPoint[] {
  try {
    const raw = localStorage.getItem(OFFLINE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) return parsed as FloodPoint[]
  } catch {}
  return []
}

function saveOffline(items: FloodPoint[]) {
  try {
    localStorage.setItem(OFFLINE_KEY, JSON.stringify(items))
  } catch {}
}

// Singleton state shared across all useFloodMap callers
const points = ref<FloodPoint[]>([])

export function useFloodMap() {
  async function init() {
    // Load offline points first
    const offline = loadOffline()
    points.value = offline

    // Try to load backend IA forecasts and merge
    try {
      const ia = useFloodIAController()
      await ia.getForecasts()
      const backendPoints: FloodPoint[] = (ia.forecasts ?? []).map((f) => ({
        id: `ia:${f.id}`,
        lat: Number((f as any).latitude ?? 0),
        lng: Number((f as any).longitude ?? 0),
        neighborhood: '',
        city: null,
        probability: Math.max(
          0,
          Math.min(100, Number((f as any).probability ?? (f as any).flood ?? 0)),
        ),
        duration: '30 min',
        source: 'backend',
        createdAt: new Date().toISOString(),
      }))

      // Merge ensuring no duplicates by id
      const existingIds = new Set(points.value.map((p) => p.id))
      const merged = [...points.value]
      for (const p of backendPoints) if (!existingIds.has(p.id)) merged.push(p)
      points.value = merged
    } catch (e) {
      // If backend is unavailable, keep offline only
      // console.warn('IA forecasts load failed, using offline only', e)
    }

    // Try to load user-created floods from backend (expects GeoJSON Point in polygon)
    try {
      const repo = container.resolve(FloodRepository)
      const result = await repo.list()
      const items = Array.isArray((result as any).results)
        ? (result as any).results
        : (result as any) || []

      const createdPoints: FloodPoint[] = items
        .map((it: any) => {
          const feature: Feature | null = it?.polygon ?? null
          if (!feature || feature.type !== 'Feature' || !feature.geometry) return null
          if (feature.geometry.type === 'Point') {
            const coords = feature.geometry.coordinates as [number, number]
            const [lng, lat] = coords
            return {
              id: `flood:${it.id}`,
              lat: Number(lat),
              lng: Number(lng),
              neighborhood: it?.neighborhood ?? '',
              city: it?.city ?? null,
              probability: Number(it?.possibility ?? it?.probability ?? 0),
              duration: it?.duration ?? '30 min',
              source: 'backend' as const,
              createdAt: it?.createdAt
                ? new Date(it.createdAt).toISOString()
                : new Date().toISOString(),
            } as FloodPoint
          }
          // Optional: fallback to centroid for polygons/lines (skip for now to keep simple)
          return null
        })
        .filter(Boolean) as FloodPoint[]

      const existingIds2 = new Set(points.value.map((p) => p.id))
      const merged2 = [...points.value]
      for (const p of createdPoints) if (!existingIds2.has(p.id)) merged2.push(p)
      points.value = merged2
    } catch (e) {
      // Silent failure keeps offline/IA points only
    }
  }

  function toGeoJson(): FeatureCollection<
    Point,
    {
      id: string
      intensity: number
      neighborhood: string
      city?: string | null
      probability: number
      duration: string
      source: FloodPoint['source']
      createdAt: string
    }
  > {
    const features: Feature<Point, any>[] = points.value
      .filter((p) => isFinite(p.lat) && isFinite(p.lng))
      .map((p) => ({
        type: 'Feature',
        properties: {
          id: p.id,
          intensity: Number(p.probability ?? 0) / 100,
          neighborhood: p.neighborhood,
          city: p.city ?? null,
          probability: Number(p.probability ?? 0),
          duration: p.duration,
          source: p.source,
          createdAt: p.createdAt,
        },
        geometry: {
          type: 'Point',
          coordinates: [p.lng, p.lat],
        },
      }))
    return { type: 'FeatureCollection', features }
  }

  function addPoint(
    input: Omit<FloodPoint, 'id' | 'source' | 'createdAt'>,
    source: FloodPoint['source'] = 'offline',
  ) {
    const id = `local:${crypto.randomUUID?.() ?? Math.random().toString(36).slice(2)}`
    const newPoint: FloodPoint = {
      id,
      source,
      createdAt: new Date().toISOString(),
      ...input,
    }
    points.value = [newPoint, ...points.value]

    // Persist locally only for offline-created points
    if (source === 'offline') {
      const offline = loadOffline()
      saveOffline([newPoint, ...offline])
    }
    return newPoint
  }

  const tablePoints = computed(() =>
    points.value
      .filter((p) => !!p.neighborhood)
      .map((p) => ({
        neighborhood: p.neighborhood,
        probability: p.probability,
        duration: p.duration,
      })),
  )

  return { points, tablePoints, init, toGeoJson, addPoint }
}
