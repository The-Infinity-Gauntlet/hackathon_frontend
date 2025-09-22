<!-- <script setup lang="ts">
import { ref, reactive, nextTick } from 'vue'
import { ButtonGlassmorphism } from '@/@core/components'

const props = defineProps({
    codeLength: {
        type: Number,
        default: 6,
    },
    buttonText: {
        type: String,
        required: false,
    },
})
const emit = defineEmits(['update:code'])

const code = reactive(new Array(props.codeLength).fill(''))
const inputRefs = ref<HTMLInputElement[]>([])

const handleInput = (e: Event, index: number) => {
    const input = e.target as HTMLInputElement
    let value = input.value

    if (value.length > 1) {
        value = value.slice(0, 1)
    }
    code[index] = value

    if (value && index < props.codeLength - 1) {
        inputRefs.value[index + 1]?.focus()
    }

    if (code.every((val) => val !== '')) {
        emit('update:code', code.join(''))
    }
}

const handleKeydown = (e: KeyboardEvent, index: number) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
        inputRefs.value[index - 1]?.focus()
    }
    if (e.key === 'ArrowLeft' && index > 0) {
        inputRefs.value[index - 1]?.focus()
    }
    if (e.key === 'ArrowRight' && index < props.codeLength - 1) {
        inputRefs.value[index + 1]?.focus()
    }
}

const handlePaste = (e: ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData?.getData('text').trim()

    if (!pastedData || !/^\d+$/.test(pastedData)) {
        return
    }

    for (let i = 0; i < props.codeLength; i++) {
        code[i] = i < pastedData.length ? pastedData[i] : ''
    }

    const focusIndex = Math.min(pastedData.length, props.codeLength - 1)
    nextTick(() => {
        inputRefs.value[focusIndex]?.focus()
    })

    if (code.every((val) => val !== '')) {
        emit('update:code', code.join(''))
    }
}
</script>

<template>
    <div class="mt-10 mb-5 flex justify-center gap-2">
        <template v-for="(_, index) in codeLength" :key="index">
            <input :ref="(el) => {
                if (el) inputRefs[index] = el as HTMLInputElement
            }
                " v-model="code[index]" type="text" maxlength="1" pattern="\d*" inputmode="numeric"
                class="h-14 w-12 rounded-lg border-2 border-gray-400 bg-gray-300 text-center text-2xl text-gray-800 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:focus:bg-gray-900"
                @input="handleInput($event, index)" @keydown="handleKeydown($event, index)" @paste="handlePaste" />
        </template>
        <ButtonGlassmorphism v-if="buttonText" :buttonText="buttonText" type="submit" />
    </div>
</template> -->

<script setup lang="ts">
import { ref, reactive, nextTick, watch } from 'vue'
import { ButtonGlassmorphism } from '@/@core/components'

const props = defineProps({
    modelValue: {
        type: String,
        default: '',
    },
    codeLength: {
        type: Number,
        default: 6,
    },
    buttonText: {
        type: String,
        required: false,
    },
})

const emit = defineEmits(['update:modelValue'])

const code = reactive<string[]>(Array(props.codeLength).fill(''))
const inputRefs = ref<HTMLInputElement[]>([])

// Atualiza quando já existe valor inicial
if (props.modelValue) {
    props.modelValue.split('').forEach((char, i) => {
        if (i < props.codeLength) code[i] = char
    })
}

// Mantém sincronizado se modelValue mudar externamente
watch(
    () => props.modelValue,
    (newVal) => {
        code.fill('')
        newVal.split('').forEach((char, i) => {
            if (i < props.codeLength) code[i] = char
        })
    },
)

const updateCode = () => {
    emit('update:modelValue', code.join(''))
}

const handleInput = (e: Event, index: number) => {
    const input = e.target as HTMLInputElement
    const value = input.value.slice(0, 1)

    code[index] = value
    updateCode()

    if (value && index < props.codeLength - 1) {
        inputRefs.value[index + 1]?.focus()
    }
}

const handleKeydown = (e: KeyboardEvent, index: number) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
        inputRefs.value[index - 1]?.focus()
    }
    if (e.key === 'ArrowLeft' && index > 0) {
        inputRefs.value[index - 1]?.focus()
    }
    if (e.key === 'ArrowRight' && index < props.codeLength - 1) {
        inputRefs.value[index + 1]?.focus()
    }
}

const handlePaste = (e: ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData?.getData('text').trim()

    if (!pastedData || !/^\d+$/.test(pastedData)) return

    for (let i = 0; i < props.codeLength; i++) {
        code[i] = i < pastedData.length ? pastedData[i] : ''
    }

    updateCode()

    const focusIndex = Math.min(pastedData.length, props.codeLength - 1)
    nextTick(() => {
        inputRefs.value[focusIndex]?.focus()
    })
}
</script>

<template>
    <div>
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

        <ButtonGlassmorphism v-if="buttonText" :buttonText="buttonText" type="submit" />
    </div>
</template>
