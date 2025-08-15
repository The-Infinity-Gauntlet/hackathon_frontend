<script setup lang="ts">
const props = defineProps({
  ticket: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="mb-3 flex items-center justify-between rounded-2xl px-2 py-5 text-sm shadow-xl">
    <div class="grid gap-1 font-semibold">
      <p>
        Código de suporte: <span class="font-normal text-[#999999]">{{ ticket.code }}</span>
      </p>
      <p>
        Suporte solicitado em: <span class="font-normal text-[#999999]">{{ ticket.date }}</span>
      </p>
      <p>
        Categoria: <span class="font-normal text-[#999999]">{{ ticket.category }}</span>
      </p>
      <p>
        Status:
        <span
          class="rounded-md px-2 py-0.5 font-normal"
          :class="[
            ticket.status === 'Concluído'
              ? 'bg-green-200 text-[#0F9900] dark:bg-green-300'
              : 'bg-red-200 text-[#990000] dark:bg-red-300',
          ]"
          >{{ ticket.status }}</span
        >
      </p>
    </div>

    <button
      class="rounded-2xl border border-[#2768CA] p-2 text-[#2768CA] dark:bg-[#2768CA] dark:text-white"
    >
      Ver detalhes
    </button>
  </div>
</template>
