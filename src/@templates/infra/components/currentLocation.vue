<script setup lang="ts">
import { onMounted } from 'vue'
import { useGeolocationStore } from '@/@core/plugins/registered/pinia/geolocation'

const geolocation = useGeolocationStore()

onMounted(() => {
  geolocation.startTracking()
})
</script>

<template>
  <div class="p-4">
    <p><strong>Latitude:</strong> {{ geolocation.latitude ?? '-' }}</p>
    <p><strong>Longitude:</strong> {{ geolocation.longitude ?? '-' }}</p>
  </div>
</template>
