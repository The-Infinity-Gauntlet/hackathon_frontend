<script setup lang="ts">
import { type PropType } from 'vue'
import type { IFormField } from '@/@core/interfaces/form'

defineProps({
    field: {
        type: Object as PropType<IFormField>,
        required: true,
    },
})
</script>

<template>
    <div class="grid gap-2">
        <label :for="field.id">{{ field.label }}</label>

        <label
            class="mx-auto flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-blue-500 px-4 py-2 font-semibold text-white transition-colors duration-300 hover:bg-blue-600"
        >
            <span>Selecionar arquivo</span>
            <input
                :type="field.type"
                :id="field.id"
                :name="field.id"
                required
                :autocomplete="field.autocomplete"
                class="hidden"
            />
            <span class="material-symbols-outlined">upload</span>
        </label>
    </div>
</template>
