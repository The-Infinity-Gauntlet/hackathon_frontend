<script setup lang="ts">
import { ref } from 'vue'
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
</script>

<template>
  <div>
    <h1 class="mb-10 hidden text-center text-2xl font-semibold lg:block">Registrar notificação</h1>
    <div class="grid gap-2">
      <p class="text-sm">Situação</p>
      <SelectFloodAlert :alert="location.data[1].message" />
    </div>
    <ProfileForm :formFields="fields" buttonText="Cadastrar" />
  </div>
</template>
