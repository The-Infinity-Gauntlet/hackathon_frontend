<script setup lang="ts">
import baseForm from '@/@core/components/forms/baseForm.vue'
import GoogleAuthButton from '../components/GoogleAuthButton.vue'
import type { IFormField } from '@/@core/interfaces/form'

const fields: IFormField[] = [
  { id: 'email', label: 'Email', placeholder: 'Digite seu email aqui', type: 'email' },
  { id: 'password', label: 'Senha', placeholder: 'Digite sua senha aqui', type: 'password' },
]
</script>

<template>
  <div class="grid justify-center">
    <baseForm :form-fields="fields" button-text="Entrar" />

    <p class="text-center my-3">ou</p>
    <GoogleAuthButton />
  </div>
</template>
