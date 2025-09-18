<script setup lang="ts">
import { ref, computed } from 'vue'
import { ProfileForm } from '@/@core/components'
import { SelectFloodAlert } from '../components'
import type { IFormField } from '@/@core/interfaces/form'

const location = ref({
  neighborhood: null as string | null,
  city: null as string | null,
  data: [
    { name: 'Temperatura', icon: '/weather_information/cloud.svg', scale: 23 },
    {
      name: 'Probabilidade de enchente',
      icon: '/weather_information/danger.svg',
      scale: 59,
      message: 'NORMALIDADE!',
    },
    { name: 'Vazão do rio', icon: '/weather_information/river_discharge.svg', scale: 46 },
  ] as const,
  date: 'Seg, 22:00',
})

const fields: IFormField[] = [
  {
    id: 'neighborhood',
    label: 'Bairro',
    placeholder: 'Digite o bairro aqui',
    type: 'text',
    autocomplete: 'neighborhood',
  },
  {
    id: 'city',
    label: 'Cidade',
    placeholder: 'Digite a cidade aqui',
    type: 'text',
    autocomplete: 'city',
  },
  {
    id: 'description',
    label: 'Descrição',
    placeholder: 'Escreva a descrição da notificação',
    type: 'text',
    autocomplete: 'description',
  },
]

const ALERTS: AlertInfo[] = [
  {
    id: 0,
    title: 'CRISE!',
    description: 'Probabilidade muito alta de alagamento.',
    bgClass: 'bg-[#6326CC] text-white',
  },
  {
    id: 1,
    title: 'ALERTA!',
    description: 'Probabilidade alta de alagamento.',
    bgClass: 'bg-[#FF0A0A] text-white',
  },
  {
    id: 2,
    title: 'ATENÇÃO!',
    description: 'Probabilidade moderada de alagamento.',
    bgClass: 'bg-[#F87400] text-black',
  },
  {
    id: 3,
    title: 'MOBILIZAÇÃO!',
    description: 'Probabilidade baixa de alagamento.',
    bgClass: 'bg-[#FFE101] text-black',
  },
  {
    id: 4,
    title: 'NORMALIDADE!',
    description: 'Probabilidade muito baixa de alagamento.',
    bgClass: 'bg-[#00D42E] text-black',
  },
]

const selectedAlertInfo = computed(
  () => ALERTS.find((a) => a.title === location.value.data[1].message) ?? ALERTS[4],
)

function requestPermissionAndNotify() {
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      console.log('Notification permission granted.')

      const notification = {
        title: selectedAlertInfo.value.title,
        body: selectedAlertInfo.value.description,
        icon: '/pwa_icons/pwa-192x192.png',
      }

      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification(notification.title, {
          body: notification.body,
          icon: notification.icon,
        })
      })
    } else {
      console.log('Unable to get permission to notify.')
    }
  })
  window.location.reload()
}
</script>

<template>
  <div>
    <h1 class="mb-10 hidden text-center text-2xl font-semibold lg:block">Registrar notificação</h1>
    <div class="grid gap-2">
      <p class="text-sm">Situação</p>
      <SelectFloodAlert v-model:alert="location.data[1].message" />
    </div>
    <ProfileForm :formFields="fields" buttonText="Cadastrar" @send="requestPermissionAndNotify" />
  </div>
</template>
