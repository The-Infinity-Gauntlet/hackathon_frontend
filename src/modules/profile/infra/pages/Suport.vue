<script setup lang="ts">
import SelectField from '@/@core/components/forms/inputs/selectField.vue'
import SupportTicket from '../components/supportTicket.vue'
import Button from '../components/button.vue'
import type { IFormField } from '@/@core/interfaces/form'

const category: IFormField[] = {
  id: 'category',
  label: '',
  type: 'select',
  name: 'Categoria',
  options: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ],
}

const status: IFormField[] = {
  id: 'status',
  label: '',
  type: 'select',
  name: 'Status',
  options: ['Pendente', 'Concluído'],
}

const tickets = [
  {
    code: '0123456789',
    date: 'DD/MM/AAAA',
    category: 'Qwerty e Dvorak',
    status: 'Concluído',
    details: '',
  },
  {
    code: '0123456789',
    date: 'DD/MM/AAAA',
    category: 'Qwerty e Dvorak',
    status: 'Pendente',
    details: '',
  },
  {
    code: '0123456789',
    date: 'DD/MM/AAAA',
    category: 'Qwerty e Dvorak',
    status: 'Concluído',
    details: '',
  },
]
</script>

<template>
  <div class="mb-10 grid justify-center px-5 py-10">
    <div class="mb-7 flex items-center gap-2">
      <span class="material-symbols-outlined">tune</span>
      <p class="text-xs font-semibold">Filtrar atendimentos</p>
      <SelectField :field="category" />
      <SelectField :field="status" />
    </div>

    <SupportTicket v-for="(ticket, index) in tickets" :key="index" :ticket="ticket" />
    <Button buttonText="Ver mais" />
  </div>
</template>
