<script setup lang="ts">
const filters = [{ name: 'Geral' }, { name: 'IA' }, { name: 'Especialista' }]
</script>

<template>
  <div
    class="mx-auto mt-10 w-[150px] rounded-2xl border border-transparent bg-[#7AA6C8]/30 p-2 text-center font-semibold shadow-xl backdrop-blur-xs"
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
  </div>
</template>
