<script setup lang="ts">
const props = defineProps<{ id: string }>()
const informations = [
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
]
const information = informations.find((i) => i.id === props.id)
</script>

<template>
  <div class="grid justify-center px-5 pt-10 pb-20">
    <h1 class="text-center text-3xl font-semibold">Dados Cadastrados</h1>
    <p class="mt-3 grid text-center font-semibold text-[#999999]">
      {{ information.date.day }}
      <span>{{ information.date.hour }}</span>
    </p>

    <ul class="mt-5 grid gap-5">
      <li
        v-for="group in information.data"
        :key="group.group"
        class="rounded-xl bg-[#E5E5E5] p-3 dark:bg-[#00182F]"
      >
        <img :src="group.icon" :alt="group.group" class="mt-1 mb-3 h-7 w-7 object-cover" />
        <div
          v-for="item in group.items"
          :key="item.label"
          class="flex justify-between font-semibold"
        >
          <p class="text-[#999999]">{{ item.label }}:</p>
          <p>{{ item.value }}</p>
        </div>
      </li>
    </ul>

    <button
      class="mx-auto mt-10 w-[250px] rounded-xl bg-blue-500 p-2 font-semibold text-white shadow-xl"
    >
      <RouterLink to="/admin/editar-clima" class="h-full w-full"> Editar </RouterLink>
    </button>
  </div>
</template>
