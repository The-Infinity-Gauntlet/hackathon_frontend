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

    <p class="my-3 text-center font-semibold">ou</p>
    <GoogleAuthButton />
    <RouterLink to="/cadastrar" class="my-3 text-center text-xs">Você ainda não tem conta? Crie uma conta</RouterLink>
  </div>
</template>
