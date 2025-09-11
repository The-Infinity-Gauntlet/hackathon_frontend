<script setup lang="ts">
import { BaseForm } from '@/@core/components'
import { GoogleAuthButton } from '../components'
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
    <BaseForm :form-fields="fields" button-text="Continuar" />

    <p class="my-3 text-center font-semibold">ou</p>
    <GoogleAuthButton />
    <RouterLink to="/entrar" class="my-3 text-center text-xs"
      >Você já tem conta? Faça o login</RouterLink
    >
  </div>
</template>
