<script setup lang="ts">
import BaseForm from '@/@core/components/forms/baseForm.vue'
import type { IFormField } from '@/@core/interfaces/form'

const fields = [
  {
    id: 'category',
    label: 'Qual a sua dúvida?',
    name: 'Selecione a categoria',
    type: 'select',
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
  },
  {
    id: 'description',
    label: 'Descrição',
    placeholder: 'Descreva a sua dúvida aqui',
    type: 'text',
    autocomplete: 'description',
  },
  {
    id: 'file',
    label: 'Enviar arquivo',
    type: 'file',
    autocomplete: 'file',
  },
]
</script>

<template>
  <div class="mb-10 grid justify-center px-5 pt-5 pb-10">
    <BaseForm :form-fields="fields" />
  </div>
</template>
