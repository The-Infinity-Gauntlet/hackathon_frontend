<script setup lang="ts">
defineProps({
  completeFields: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <div class="my-10 grid w-[332px] gap-5">
    <div v-for="field of completeFields" :key="field.id" class="flex justify-between gap-5 p-3">
      <p>{{ field.name }}</p>
      <p class="text-sm text-[#999999]">{{ field.data }}</p>
    </div>

    <div class="flex items-center justify-between rounded-2xl p-3 shadow-lg dark:bg-[#00182F]">
      <div class="flex items-center">
        <img src="/payment/donation.svg" alt="Doação" />
        <p class="font-semibold">Doação</p>
      </div>
      <p class="rounded-xl border border-[#7AA6C8] p-2">R$ 00,00</p>
    </div>
  </div>
</template>
