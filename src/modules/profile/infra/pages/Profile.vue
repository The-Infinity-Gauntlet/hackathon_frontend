<script setup lang="ts">
import { ref } from 'vue'

const user = ref({
  picture: '/nicolefemello.jpeg',
  name: 'Nicole Ferreira Mello',
  email: 'nicfmello@gmail.com',
  dateborn: '27/01/2009',
  created: '12/08/2025',
})
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <div
      class="relative -mt-12 flex-1 rounded-t-3xl bg-white p-5 text-center shadow-lg dark:bg-[#0f172a]"
    >
      <div
        class="absolute -top-12 left-1/2 h-24 w-24 -translate-x-1/2 overflow-hidden rounded-full border-4 border-white bg-[#d9d9d9] dark:border-[#0f172a]"
      >
        <img :src="user.picture" :alt="user.name" class="h-full w-full object-cover" />
      </div>

      <div class="mt-14">
        <h2 class="font-semibold">{{ user.name }}</h2>
        <p class="text-gray-500">{{ user.email }}</p>
      </div>
      <p class="mt-3">Data de Nascimento: {{ user.dateborn }}</p>
      <p>Data da Criação da Conta: {{ user.created }}</p>

      <button
        class="mx-auto mt-5 w-[250px] rounded-2xl bg-blue-500 p-2 font-semibold text-white shadow-xl"
      >
        Editar informações
      </button>
    </div>
  </div>
</template>
