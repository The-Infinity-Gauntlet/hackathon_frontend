import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGeolocationStore = defineStore('geolocation', () => {
  const latitude = ref<number | null>(null)
  const longitude = ref<number | null>(null)
  let watchId: number | null = null

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

  return {
    latitude,
    longitude,
    startTracking,
    stopTracking,
  }
})
