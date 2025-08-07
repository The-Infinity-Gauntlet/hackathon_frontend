<script setup lang="ts">
import { ref } from 'vue'

const latitude = ref(null)
const longitude = ref(null)
const tracking = ref(false)
let watchId = null

;(function startTracking() {
  if (!('geolocation' in navigator)) {
    console.log('Geolocalização não suportada neste navegador.')
    return
  }

  tracking.value = true

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
      tracking.value = false
    },
    {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 5000,
    },
  )
})()
</script>

<template>
  <div class="p-4">
    <p><strong>Latitude:</strong> {{ latitude ?? '-' }}</p>
    <p><strong>Longitude:</strong> {{ longitude ?? '-' }}</p>
  </div>
</template>
