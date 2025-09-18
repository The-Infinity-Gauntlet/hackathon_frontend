<script setup lang="ts">
import { toast } from 'vue3-toastify'
import { ButtonGlassmorphism } from '@/@core/components'

const props = defineProps({
  qrcode: {
    type: String,
    default: '/qrcode.svg',
  },
  code: {
    type: String,
    default: '',
  },
  time: {
    type: String,
    default: '',
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

const copyCode = async () => {
  if (!props.code) return
  try {
    await navigator.clipboard.writeText(props.code)
    toast.success('Código copiado com sucesso!', {
      autoClose: 2000,
      position: 'top-right',
      theme: 'light',
    })
  } catch (err) {
    toast.warn('O código não foi copiado!', {
      autoClose: 2000,
      position: 'top-right',
      theme: 'light',
    })
  }
}
</script>

<template>
  <div v-if="showPopup" class="fixed inset-0 z-20 flex items-center justify-center bg-black/80">
    <div
      class="flex max-h-[90vh] w-[90%] max-w-md flex-col overflow-y-auto rounded-lg bg-white pt-4 pb-7 shadow-lg dark:bg-[#000d19]"
    >
      <div class="flex justify-between px-5">
        <button
          class="text-2xl text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          @click="closePopup"
        >
          ×
        </button>
      </div>

      <div class="flex flex-col items-center gap-3 px-10 pt-3 pb-5 text-center">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Escaneie o QR code</h2>
        <p class="text-xs text-[#999999]">
          Escaneie com a câmera do seu celular para realizar o pagamento
        </p>
        <img v-if="qrcode" :src="qrcode" alt="QRCode" class="max-w-full rounded-md" />
        <p class="text-xs text-[#999999]">ou insira o código abaixo</p>
        <p class="break-all text-[#0453AF]">{{ code }}</p>
        <ButtonGlassmorphism buttonText="Copiar código" @click="copyCode" />
        <p class="text-xs text-[#999999]">Expira em {{ time }} segundos</p>
        <RouterLink to="/pagamento" class="text-[#0453AF] underline">Doe com pix</RouterLink>
      </div>
    </div>
  </div>
</template>
