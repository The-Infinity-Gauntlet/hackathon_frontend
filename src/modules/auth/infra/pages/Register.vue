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
  <div class="grid justify-center lg:flex lg:h-screen lg:gap-200">
    <div class="my-auto hidden gap-5 text-center text-white lg:grid">
      <h3 class="text-4xl font-semibold">Bem-vindo!</h3>
      <p class="w-[332px] font-semibold">
        Que bom que você voltou. Faça o login e continue a aproveitando os benefícios do AQUA
      </p>
      <RouterLink to="/entrar"
        class="flex items-center justify-center gap-2 rounded-2xl border border-transparent bg-[#7AA6C8]/30 px-10 py-2 font-semibold shadow-xl backdrop-blur-xs">
        Entrar <span class="material-symbols-outlined">arrow_forward</span></RouterLink>
    </div>

    <div class="grid justify-center lg:my-auto">
      <h1 class="hidden text-center text-2xl font-semibold lg:block">Cadastro</h1>
      <BaseForm :form-fields="fields" button-text="Continuar" />

      <p class="my-3 text-center font-semibold">ou</p>
      <GoogleAuthButton />
      <RouterLink to="/entrar" class="my-3 text-center text-xs lg:hidden">Você já tem conta? Faça o login</RouterLink>
    </div>
  </div>
</template>
