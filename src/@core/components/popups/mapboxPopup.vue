<script setup lang="ts">
import { onMounted } from 'vue'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY

const emit = defineEmits(['close'])

onMounted(() => {
  // Mapa dentro do popup
  const map = new mapboxgl.Map({
    container: 'map-popup',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [-48.8464, -26.3044],
    zoom: 13,
  })
})

const handleOverlayClick = (event: MouseEvent) => {
  if ((event.target as HTMLElement).id === 'overlay') {
    emit('close')
  }
}
</script>

<template>
  <div
    id="overlay"
    class="fixed inset-0 z-20 flex items-center justify-center bg-black/80"
    @click="handleOverlayClick"
  >
    <div
      class="flex max-h-[90vh] w-[90%] max-w-md flex-col overflow-y-auto rounded-2xl bg-white p-4 shadow-lg dark:bg-[#000d19]"
    >
      <div class="flex items-center justify-between gap-3">
        <input
          type="text"
          placeholder="Buscar localização"
          class="w-full rounded-2xl border border-[#7AA6C8] px-3 py-2 text-xs outline-none"
        />
        <span class="material-symbols-outlined text-[#7AA6C8]">search</span>
      </div>

      <div class="mt-3 h-[480px] overflow-hidden rounded-2xl">
        <div id="map-popup" class="h-full w-full"></div>
      </div>
    </div>
  </div>
</template>
