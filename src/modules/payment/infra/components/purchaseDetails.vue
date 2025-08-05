<script setup lang="ts">
defineProps({
  completeFields: {
    type: Array,
    required: true
  },
});
</script>

<template>
  <div class="grid w-[332px] gap-5 my-10">
    <div v-for="field of completeFields" :key="field.id" class="flex justify-between p-3 gap-5">
      <p>{{ field.name }}</p>
      <p class="text-sm text-[#999999]">{{ field.data }}</p>
    </div>

    <div class="flex justify-between dark:bg-[#00182F] items-center p-3 shadow-lg rounded-2xl">
      <div class="flex items-center">
        <img src="/payment/donation.svg" alt="Doação">
        <p class="font-semibold">Doação</p>
      </div>
      <p class="border border-[#7AA6C8] p-2 rounded-xl">R$ 00,00</p>
    </div>
  </div>
</template>