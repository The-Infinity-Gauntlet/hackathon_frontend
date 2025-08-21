<script setup lang="ts">
import { BaseForm } from '@/@core/components'
import { GoogleAuthButton } from '../components'
import type { IFormField } from '@/@core/interfaces/form'

const fields: IFormField[] = [
  { id: 'email', label: 'Email', placeholder: 'Digite seu email aqui', type: 'email' },
  { id: 'password', label: 'Senha', placeholder: 'Digite sua senha aqui', type: 'password' },
]
</script>

<template>
  <div class="grid justify-center">
    <BaseForm :form-fields="fields" button-text="Entrar" />

    <p class="my-3 text-center">ou</p>
    <GoogleAuthButton />
  </div>
</template>
