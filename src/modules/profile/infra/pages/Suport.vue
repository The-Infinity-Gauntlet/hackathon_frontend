<script setup lang="ts">
import SelectField from '@/@core/components/forms/inputs/selectField.vue'
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
</script>

<template>
  <div class="grid justify-center px-5 py-10">
    <div class="flex items-center gap-2">
      <span class="material-symbols-outlined">tune</span>
      <p class="text-xs font-semibold">Filtrar atendimentos</p>
      <SelectField :field="category" />
      <SelectField :field="status" />
    </div>
  </div>
</template>
