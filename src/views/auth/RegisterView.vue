<script setup lang="ts">
import HeaderComp from "@/components/general/HeaderComp.vue"
import Form from '@/components/auth/Form.vue'
import GoogleAuthButton from '@/components/auth/GoogleAuthButton.vue'

const fields = [
  { id: 'name', label: 'Nome', placeholder: 'Digite seu nome aqui', type: 'text', autocomplete: 'name' },
  { id: 'email', label: 'Email', placeholder: 'Digite seu email aqui', type: 'email', autocomplete: 'email' },
  { id: 'dateborn', label: 'Data de nascimento', name: 'Mês', options: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"] },
  { id: 'password', label: 'Senha', placeholder: 'Digite sua senha aqui', type: 'password', autocomplete: 'new-password' },
  { id: 'password-confirm', label: 'Confirme sua Senha', placeholder: 'Repita sua senha aqui', type: 'password', autocomplete: 'new-password' },
]
</script>

<template>
  <div class="grid justify-center">
    <HeaderComp title="Cadastro" />

    <Form :form-fields="fields" text="Continuar" />

    <p class="text-center my-3">ou</p>
    <GoogleAuthButton />
    <!-- <button class="border border-[#2768CA] p-1 rounded-2xl text-sm">Continuar com o Google</button> -->
  </div>
</template>
