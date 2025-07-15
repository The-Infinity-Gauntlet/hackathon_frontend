<script setup lang="ts">
import HeaderComp from "@/components/general/HeaderComp.vue"
import Form from '@/components/auth/Form.vue'
import GoogleAuthButton from '@/components/auth/GoogleAuthButton.vue'

const fields = [
  { label: 'Email', placeholder: 'Digite seu email aqui', type: 'email' },
  { label: 'Senha', placeholder: 'Digite sua senha aqui', type: 'password' },
]
</script>

<template>
  <div class="grid justify-center">
    <HeaderComp title="Login" />

    <Form :form-fields="fields" text="Entrar" />

    <p class="text-center my-3">ou</p>
    <GoogleAuthButton />
    <!-- <button class="border border-[#2768CA] p-1 rounded-2xl text-sm">Continuar com o Google</button> -->
  </div>
</template>
