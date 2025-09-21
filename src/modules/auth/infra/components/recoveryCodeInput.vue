<script setup lang="ts">
import { ref, reactive, nextTick } from 'vue'

// Define props para tornar o componente reutilizável e emits para comunicação
const props = defineProps({
    codeLength: {
        type: Number,
        default: 6,
    },
})
const emit = defineEmits(['update:code'])

// Array reativo para os valores dos inputs e referências para os elementos do DOM
const code = reactive(new Array(props.codeLength).fill(''))
const inputRefs = ref<HTMLInputElement[]>([])

/* Lida com a entrada de dados do usuário em cada input. */
const handleInput = (e: Event, index: number) => {
    const input = e.target as HTMLInputElement
    let value = input.value

    // Garante que apenas um dígito seja mantido
    if (value.length > 1) {
        value = value.slice(0, 1)
    }
    code[index] = value

    // Se um dígito for inserido, foca no próximo input
    if (value && index < props.codeLength - 1) {
        inputRefs.value[index + 1]?.focus()
    }

    // Emite o código completo quando todos os campos estiverem preenchidos
    if (code.every((val) => val !== '')) {
        emit('update:code', code.join(''))
    }
}

/**
 * Lida com eventos de teclado como Backspace e setas de navegação.
 */
const handleKeydown = (e: KeyboardEvent, index: number) => {
    // Move o foco para o input anterior no Backspace se o atual estiver vazio
    if (e.key === 'Backspace' && !code[index] && index > 0) {
        inputRefs.value[index - 1]?.focus()
    }
    // Permite navegação com as setas esquerda e direita
    if (e.key === 'ArrowLeft' && index > 0) {
        inputRefs.value[index - 1]?.focus()
    }
    if (e.key === 'ArrowRight' && index < props.codeLength - 1) {
        inputRefs.value[index + 1]?.focus()
    }
}

/**
 * Lida com o evento de colar um código.
 */
const handlePaste = (e: ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData?.getData('text').trim()

    // Verifica se o dado colado é válido (apenas dígitos)
    if (!pastedData || !/^\d+$/.test(pastedData)) {
        return
    }

    // Preenche os inputs com os dados colados
    for (let i = 0; i < props.codeLength; i++) {
        code[i] = i < pastedData.length ? pastedData[i] : ''
    }

    // Foca no último input preenchido
    const focusIndex = Math.min(pastedData.length, props.codeLength - 1)
    nextTick(() => {
        inputRefs.value[focusIndex]?.focus()
    })

    // Emite o código completo se todos os campos foram preenchidos
    if (code.every((val) => val !== '')) {
        emit('update:code', code.join(''))
    }
}
</script>

<template>
    <div class="mt-10 mb-5 flex justify-center gap-2">
        <template v-for="(_, index) in codeLength" :key="index">
            <input
                :ref="
                    (el) => {
                        if (el) inputRefs[index] = el as HTMLInputElement
                    }
                "
                v-model="code[index]"
                type="text"
                maxlength="1"
                pattern="\d*"
                inputmode="numeric"
                class="h-14 w-12 rounded-lg border-2 border-gray-400 bg-gray-300 text-center text-2xl text-gray-800 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:focus:bg-gray-900"
                @input="handleInput($event, index)"
                @keydown="handleKeydown($event, index)"
                @paste="handlePaste"
            />
        </template>
    </div>
</template>
