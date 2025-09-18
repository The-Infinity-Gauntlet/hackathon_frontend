<script setup lang="ts">
const props = defineProps({
  ticket: {
    type: Object,
    required: true,
  },
  showPopup: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close'])

const closePopup = () => {
  emit('close')
}

const handleOverlayClick = (event: MouseEvent) => {
  if ((event.target as HTMLElement).id === 'overlay') {
    emit('close')
  }
}
</script>

<template>
  <div
    id="overlay"
    v-if="showPopup"
    class="fixed inset-0 z-20 flex items-center justify-center bg-black/80"
    @click="handleOverlayClick"
  >
    <div
      class="flex w-[90%] max-w-md flex-col rounded-lg bg-white pt-5 pb-7 shadow-lg dark:bg-[#000d19]"
    >
      <div class="flex items-center px-5">
        <span class="material-symbols-outlined text-[#999999]" @click="closePopup"
          >arrow_back_ios</span
        >
        <p class="mx-auto font-semibold">
          Suporte <span class="text-[#999999]">{{ ticket.code }}</span>
        </p>
      </div>

      <div v-for="(interaction, index) in ticket.interactions" :key="index" class="px-6 pt-5">
        <div class="flex items-center gap-3">
          <img
            :src="interaction.user.picture"
            :alt="interaction.user.name"
            class="h-10 w-10 rounded-full bg-[#d9d9d9] object-cover"
          />
          <p class="font-semibold">
            {{ interaction.user.name }}
            <span class="text-xs font-normal text-[#999999]">{{ interaction.date }}</span>
          </p>
        </div>

        <p class="my-2 text-xs">{{ interaction.details }}</p>

        <div v-if="interaction.imgs" class="flex gap-3">
          <img
            v-for="img in interaction.imgs"
            :key="img"
            :src="img"
            :alt="img"
            class="object-cover"
          />
        </div>
      </div>

      <RouterLink
        to="/suporte/enviar-mensagem"
        class="mx-auto mt-4 w-[250px] rounded-2xl bg-blue-500 p-2 text-center font-semibold text-white shadow-xl transition-colors duration-300 hover:bg-blue-600"
      >
        Enviar mensagem
      </RouterLink>
    </div>
  </div>
</template>
