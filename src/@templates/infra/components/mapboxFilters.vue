<script setup lang="ts">
const filters = [{ name: 'Geral' }, { name: 'IA' }, { name: 'Especialista' }]
<<<<<<< HEAD

const fields = [
  { start: '81%', end: '100%' },
  { start: '61%', end: '80%' },
  { start: '41%', end: '60%' },
  { start: '21%', end: '40%' },
  { start: '0%', end: '20%' },
]
=======
>>>>>>> b7af0da2219448486f2a004193fa7bd39944b902
</script>

<template>
  <div
<<<<<<< HEAD
    class="mt-10 flex justify-center gap-2 lg:absolute lg:bottom-8 lg:z-2 lg:mt-0 lg:flex lg:w-full lg:justify-between lg:gap-10 lg:px-15 lg:font-semibold">
    <div
      class="border-r border-[#E5E5E5] px-5 text-center lg:rounded-2xl lg:border lg:border-transparent lg:bg-[#7AA6C8]/30 lg:p-5 lg:shadow-xl lg:backdrop-blur-xs dark:border-[#00182F] lg:dark:border-transparent">
      <h3 class="text-lg font-semibold">Legendas</h3>
      <p class="text-xs font-semibold">Probabilidade de alagamento</p>

      <div class="mt-5 flex gap-3">
        <div class="h-30 w-5 rounded-lg bg-gradient-to-b from-[#0047AB] to-[#00B2A9]"></div>
        <ul class="grid h-32 justify-between">
          <li v-for="field in fields" :key="field.start" class="text-left text-xs">
            {{ field.end }} - {{ field.start }}
          </li>
        </ul>
      </div>
    </div>

    <div
      class="px-5 text-center lg:rounded-2xl lg:border lg:border-transparent lg:bg-[#7AA6C8]/30 lg:p-5 lg:shadow-xl lg:backdrop-blur-xs">
      <h3 class="text-lg font-semibold">Camadas</h3>
      <p class="text-xs font-semibold">Aperte para mudar a camada</p>
      <ul class="mt-5 grid gap-3">
        <li v-for="filter in filters" :key="filter.name"
          class="cursor-pointer rounded-lg bg-[#2768CA] py-2 text-xs text-white hover:bg-[#263e61]">
          {{ filter.name }}
        </li>
      </ul>
    </div>
=======
    class="mx-auto mt-10 w-[7.813vw] rounded-2xl border border-transparent bg-[#7AA6C8]/30 p-2 text-center font-semibold shadow-xl backdrop-blur-xs"
  >
    <h4>Camadas</h4>
    <ul class="mt-3 grid gap-3">
      <li
        v-for="filter in filters"
        :key="filter.name"
        class="rounded-lg bg-[#2768CA] py-2 text-xs text-white hover:bg-[#263e61]"
      >
        {{ filter.name }}
      </li>
    </ul>
>>>>>>> b7af0da2219448486f2a004193fa7bd39944b902
  </div>
</template>
