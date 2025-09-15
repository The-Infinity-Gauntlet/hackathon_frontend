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
  <div class="grid justify-center lg:flex lg:h-screen lg:gap-[40vw]">
    <div class="grid justify-center lg:my-auto">
      <h1 class="hidden text-center text-2xl font-semibold lg:block">Login</h1>
      <BaseForm :form-fields="fields" button-text="Entrar" />

      <p class="my-3 text-center font-semibold">ou</p>
      <GoogleAuthButton />
      <RouterLink to="/cadastrar" class="my-3 text-center text-xs lg:hidden"
        >Você ainda não tem conta? Crie uma conta
      </RouterLink>
    </div>

    <div class="my-auto hidden gap-5 text-center text-white lg:grid">
      <h3 class="text-4xl font-semibold">Não tem conta?</h3>
      <p class="w-[332px] font-semibold">
        Faça o cadastro agora e <span>aproveite todos os benefícios do </span><span>AQUA</span>
      </p>
      <RouterLink
        to="/cadastrar"
        class="flex items-center justify-center gap-2 rounded-2xl border border-transparent bg-[#7AA6C8]/30 px-10 py-2 font-semibold shadow-xl backdrop-blur-xs"
      >
        Cadastre-se <span class="material-symbols-outlined">arrow_forward</span></RouterLink
      >
    </div>
  </div>
</template>
