<script setup lang="ts">
import { ref } from 'vue'

const floodPoints = ref([
  {
    id: 'joao-costa',
    data: '06/09/2025',
    category: 'Pontos de riscos',
    neighborhood: 'João Costa',
    info: {
      date: {
        day: 'Sáb, 30 nov 2025',
        hour: '12:06',
      },
      data: [
        {
          group: 'Localização',
          icon: '/icons/admin/global.svg',
          items: [
            { label: 'Latitude', value: '12.4567' },
            { label: 'Longitude', value: '-47.8912' },
          ],
        },
        {
          group: 'Endereço',
          icon: '/icons/admin/localization.svg',
          items: [
            { label: 'Cidade', value: 'Joinville' },
            { label: 'Bairro', value: 'Floresta' },
          ],
        },
        {
          group: 'Clima',
          icon: '/icons/admin/rain.svg',
          items: [
            { label: 'Chuva', value: '7mm' },
            { label: 'Umidade', value: '68%' },
          ],
        },
        {
          group: 'Rio',
          icon: '/icons/admin/river.svg',
          items: [
            { label: 'Pressão', value: '1015 hPa' },
            { label: 'Vazão do rio', value: '0,8 m' },
          ],
        },
        {
          group: 'Previsão',
          icon: '/icons/admin/forecast.svg',
          items: [
            { label: 'Probabilidade', value: '20%' },
            { label: 'Duração', value: '3h' },
          ],
        },
      ],
    },
  },
  {
    id: 'floresta',
    data: '06/09/2025',
    category: 'Pontos de riscos',
    neighborhood: 'Floresta',
    info: {
      date: {
        day: 'Sáb, 30 nov 2025',
        hour: '12:06',
      },
      data: [
        {
          group: 'Localização',
          icon: '/icons/admin/global.svg',
          items: [
            { label: 'Latitude', value: '12.4567' },
            { label: 'Longitude', value: '-47.8912' },
          ],
        },
        {
          group: 'Endereço',
          icon: '/icons/admin/localization.svg',
          items: [
            { label: 'Cidade', value: 'Joinville' },
            { label: 'Bairro', value: 'Floresta' },
          ],
        },
        {
          group: 'Clima',
          icon: '/icons/admin/rain.svg',
          items: [
            { label: 'Chuva', value: '7mm' },
            { label: 'Umidade', value: '68%' },
          ],
        },
        {
          group: 'Rio',
          icon: '/icons/admin/river.svg',
          items: [
            { label: 'Pressão', value: '1015 hPa' },
            { label: 'Vazão do rio', value: '0,8 m' },
          ],
        },
        {
          group: 'Previsão',
          icon: '/icons/admin/forecast.svg',
          items: [
            { label: 'Probabilidade', value: '20%' },
            { label: 'Duração', value: '3h' },
          ],
        },
      ],
    },
  },
  {
    id: 'aventureiro',
    data: '06/09/2025',
    category: 'Pontos de riscos',
    neighborhood: 'Aventureiro',
    info: {
      date: {
        day: 'Sáb, 30 nov 2025',
        hour: '12:06',
      },
      data: [
        {
          group: 'Localização',
          icon: '/icons/admin/global.svg',
          items: [
            { label: 'Latitude', value: '12.4567' },
            { label: 'Longitude', value: '-47.8912' },
          ],
        },
        {
          group: 'Endereço',
          icon: '/icons/admin/localization.svg',
          items: [
            { label: 'Cidade', value: 'Joinville' },
            { label: 'Bairro', value: 'Floresta' },
          ],
        },
        {
          group: 'Clima',
          icon: '/icons/admin/rain.svg',
          items: [
            { label: 'Chuva', value: '7mm' },
            { label: 'Umidade', value: '68%' },
          ],
        },
        {
          group: 'Rio',
          icon: '/icons/admin/river.svg',
          items: [
            { label: 'Pressão', value: '1015 hPa' },
            { label: 'Vazão do rio', value: '0,8 m' },
          ],
        },
        {
          group: 'Previsão',
          icon: '/icons/admin/forecast.svg',
          items: [
            { label: 'Probabilidade', value: '20%' },
            { label: 'Duração', value: '3h' },
          ],
        },
      ],
    },
  },
])
</script>

<template>
  <div>
    <button
      class="mx-auto flex items-center justify-center gap-3 rounded-2xl bg-[#2768CA] px-25 py-2 font-semibold text-white">
      <span class="material-symbols-outlined">tune</span>Filtrar dados
    </button>

    <table class="mt-10 w-full table-fixed border-collapse overflow-hidden rounded-2xl">
      <thead>
        <tr class="rounded-2xl border border-[#7AA6C8] text-center text-sm">
          <th class="border border-[#7AA6C8] py-2">Data</th>
          <th class="border border-[#7AA6C8] py-2">Categoria</th>
          <th class="border border-[#7AA6C8] py-2">Bairro</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="point in floodPoints" :key="point.id"
          class="rounded-2xl border border-[#999999] text-center text-xs lg:text-lg">
          <td class="py-5">{{ point.data }}</td>
          <td class="grid py-5">
            {{ point.category }}
            <button class="mx-auto mt-5 rounded-2xl bg-[#2768CA] px-10 py-1 text-white">
              <RouterLink :to="{ path: `/admin/dados-cadastrados/${point.id}`, params: { id: point.id } }">Ver mais
              </RouterLink>
            </button>
          </td>
          <td class="py-5">{{ point.neighborhood }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
