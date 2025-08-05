<script setup lang="ts">
import baseForm from '@/@core/components/forms/baseForm.vue'
import GoogleAuthButton from '../components/GoogleAuthButton.vue'
import type { IFormField } from '@/@core/interfaces/form'

const fields: IFormField[] = [
  {
    id: 'name',
    label: 'Nome',
    placeholder: 'Digite seu nome aqui',
    type: 'text',
    autocomplete: 'name',
  },
  {
    id: 'email',
    label: 'Email',
    placeholder: 'Digite seu email aqui',
    type: 'email',
    autocomplete: 'email',
  },
  {
    id: 'dateborn',
    label: 'Data de nascimento',
    type: 'date',
    name: 'Mês',
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
    id: 'password',
    label: 'Senha',
    placeholder: 'Digite sua senha aqui',
    type: 'password',
    autocomplete: 'new-password',
  },
  {
    id: 'password-confirm',
    label: 'Confirme sua Senha',
    placeholder: 'Repita sua senha aqui',
    type: 'password',
    autocomplete: 'new-password',
  },
]
</script>

<template>
  <div class="grid justify-center">
    <baseForm :form-fields="fields" button-text="Continuar" />

    <p class="text-center my-3">ou</p>
    <GoogleAuthButton />
  </div>
</template>
