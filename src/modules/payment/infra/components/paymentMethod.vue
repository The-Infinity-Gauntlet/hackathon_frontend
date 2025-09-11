<script setup lang="ts">
import { ref } from 'vue'
import { ButtonGlassmorphism } from '@/@core/components'

const payForms = [
  { id: 1, icon: '/payment/card.svg', name: 'Cartão' },
  { id: 2, icon: '/payment/pix.svg', name: 'Pix' },
  { id: 3, icon: '/payment/bank_slip.svg', name: 'Boleto' },
]

const selected = ref<number | null>(null)

const emit = defineEmits<{
  (e: 'finish', value: number | null): void
}>()

const finalize = () => {
  if (selected.value !== null) {
    emit('finish', selected.value)
  } else {
    alert('Por favor, selecione um método de pagamento.')
  }
}
</script>

<template>
  <div class="my-10 grid w-[332px] gap-5">
    <label v-for="form in payForms" :key="form.id" class="cursor-pointer">
      <input type="radio" name="method" :value="form.id" v-model="selected" class="peer hidden" />
      <div
        class="flex justify-center gap-5 rounded-2xl border-2 border-transparent p-3 py-5 shadow-lg transition peer-checked:border-blue-600 dark:bg-[#00182F]"
      >
        <img :src="form.icon" :alt="form.name" />
        <p>{{ form.name }}</p>
      </div>
    </label>

    <ButtonGlassmorphism buttonText="Pagar" @click="finalize" />
  </div>
</template>
