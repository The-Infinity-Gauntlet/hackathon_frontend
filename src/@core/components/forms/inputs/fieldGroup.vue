<!-- <script setup lang="ts">
import { type PropType } from 'vue'
import type { IFormField } from '@/@core/interfaces/form'
import { TextField } from '@/@core/components'

defineProps({
    fields: {
        type: Array as PropType<IFormField[]>,
        required: true,
    },
})
</script>

<template>
    <div class="flex justify-center gap-3">
        <TextField v-for="field in fields" :key="field.id" :field="field" />
    </div>
</template> -->

<script setup lang="ts">
import { type PropType, reactive, watch } from 'vue'
import type { IFormField } from '@/@core/interfaces/form'
import { TextField } from '@/@core/components'

const props = defineProps({
    fields: {
        type: Array as PropType<IFormField[]>,
        required: true,
    },
    modelValue: {
        type: Object as PropType<Record<string, any>>,
        default: () => ({}),
    },
})

const emit = defineEmits<{
    (e: 'update:modelValue', value: Record<string, any>): void
}>()

const groupValues = reactive<Record<string, any>>({})

// Inicializa groupValues com os valores já existentes do modelValue
props.fields.forEach((field) => {
    groupValues[field.id] = props.modelValue[field.id] ?? ''
})

// Watch para emitir apenas os valores do grupo
watch(
    () => ({ ...groupValues }),
    (val) => {
        emit('update:modelValue', val)
    },
    { deep: true },
)
</script>

<template>
    <div class="flex justify-center gap-3">
        <TextField
            v-for="field in fields"
            :key="field.id"
            :field="field"
            v-model="groupValues[field.id]"
        />
    </div>
</template>
