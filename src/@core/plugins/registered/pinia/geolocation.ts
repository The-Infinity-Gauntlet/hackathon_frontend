import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useNeighborhood } from '@/@core/composables/neighborhood'

export const useGeolocationStore = defineStore('geolocation', () => {
  const latitude = ref<number | null>(null)
  const longitude = ref<number | null>(null)
  let watchId: number | null = null
  const neighborhood = ref<string | null>(null)
  const { loadNeighborhoods, getNeighborhood } = useNeighborhood()

  function startTracking() {
    if (!('geolocation' in navigator)) {
      console.log('Geolocalização não suportada neste navegador.')
      return
    }

    watchId = navigator.geolocation.watchPosition(
      (position) => {
        latitude.value = position.coords.latitude
        longitude.value = position.coords.longitude
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            console.log('Permissão negada pelo usuário.')
            break
          case error.POSITION_UNAVAILABLE:
            console.log('Informações de localização indisponíveis.')
            break
          case error.TIMEOUT:
            console.log('Tempo limite ao tentar obter a localização.')
            break
          default:
            console.log('Erro desconhecido.')
            break
        }
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
      },
    )
  }

  function stopTracking() {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId)
      watchId = null
    }
  }

  async function findNeighborhood(): Promise<string | null> {
    await loadNeighborhoods()
    startTracking()

    return new Promise((resolve) => {
      const stop = watch(
        [() => latitude.value, () => longitude.value],
        ([lat, lng], _, onCleanup) => {
          if (lat != null && lng != null) {
            try {
              neighborhood.value = getNeighborhood(lng, lat)
              console.log('latitude: ', lat, 'longitude: ', lng)
              console.log('Bairro atual: ', neighborhood.value)
              resolve(neighborhood.value)
              onCleanup(() => stop())
            } catch (error) {
              console.error('Erro ao buscar bairro:', error)
              neighborhood.value = null
              resolve(null)
              onCleanup(() => stop())
            }
          }
        },
        { immediate: true },
      )
    })
  }

  return {
    latitude,
    longitude,
    neighborhood,
    startTracking,
    stopTracking,
    findNeighborhood,
  }
})
