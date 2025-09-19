<script setup lang="ts">
import { ref, computed } from 'vue'
import { BaseForm } from '@/@core/components'
import { GoogleAuthButton } from '../components'
import type { IFormField } from '@/@core/interfaces/form'

const isLogin = ref(true)

const loginFields: IFormField[] = [
  { id: 'email', label: 'Email', placeholder: 'Digite seu email aqui', type: 'email' },
  { id: 'password', label: 'Senha', placeholder: 'Digite sua senha aqui', type: 'password' },
]
const registerFields: IFormField[] = [
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

const waveDirection = computed<'left' | 'right'>(() => {
  return isLogin.value ? 'right' : 'left'
})
function toggleWave() {
  isLogin.value = !isLogin.value
}
</script>

<template>
  <div
    class="absolute inset-0 -z-10 hidden h-full w-full bg-cover bg-center transition-transform duration-1000 lg:block"
    :class="{
      'translate-x-[30%]': waveDirection === 'right',
      'translate-x-[-50%]': waveDirection === 'left',
    }"
    style="background-image: url('/layouts/wavesAuth.svg')"
  ></div>

  <Transition
    mode="out-in"
    enter-active-class="transition duration-500 ease-out"
    leave-active-class="transition duration-500 ease-in"
    enter-from-class="opacity-0 translate-x-10"
    enter-to-class="opacity-100 translate-x-0"
    leave-from-class="opacity-100 translate-x-0"
    leave-to-class="opacity-0 -translate-x-10"
  >
    <div v-if="isLogin" class="grid justify-center lg:flex lg:h-screen lg:gap-[40vw]">
      <div class="grid justify-center lg:my-auto">
        <h1 class="hidden text-center text-2xl font-semibold lg:block">Login</h1>
        <BaseForm :form-fields="loginFields" button-text="Entrar" />

        <p class="my-3 text-center font-semibold">ou</p>
        <GoogleAuthButton />
        <button @click="toggleWave" class="my-3 text-center text-xs lg:hidden">
          Você ainda não tem conta? Crie uma conta
        </button>
      </div>

      <div class="my-auto hidden gap-5 text-center text-white lg:grid">
        <h3 class="text-4xl font-semibold">Não tem conta?</h3>
        <p class="w-[332px] font-semibold">
          Faça o cadastro agora e <span>aproveite todos os benefícios do </span><span>AQUA</span>
        </p>
        <button
          @click="toggleWave"
          class="flex items-center justify-center gap-2 rounded-2xl border border-transparent bg-[#7AA6C8]/30 px-10 py-2 font-semibold shadow-xl backdrop-blur-xs"
        >
          Cadastre-se <span class="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </div>

    <div v-else class="grid justify-center pb-20 lg:flex lg:h-screen lg:gap-200 lg:pb-0">
      <div class="my-auto hidden gap-5 text-center text-white lg:grid">
        <h3 class="text-4xl font-semibold">Bem-vindo!</h3>
        <p class="w-[332px] font-semibold">
          Que bom que você voltou. Faça o login e continue a aproveitando os benefícios do AQUA
        </p>
        <button
          @click="toggleWave"
          class="flex items-center justify-center gap-2 rounded-2xl border border-transparent bg-[#7AA6C8]/30 px-10 py-2 font-semibold shadow-xl backdrop-blur-xs"
        >
          Entrar <span class="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>

      <div class="grid justify-center lg:my-auto">
        <h1 class="hidden text-center text-2xl font-semibold lg:block">Cadastro</h1>
        <BaseForm :form-fields="registerFields" button-text="Continuar" />

        <p class="my-3 text-center font-semibold">ou</p>
        <GoogleAuthButton />
        <button @click="toggleWave" class="my-3 text-center text-xs lg:hidden">
          Você já tem conta? Faça o login
        </button>
      </div>
    </div>
  </Transition>
</template>
