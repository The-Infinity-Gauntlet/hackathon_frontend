<script setup lang="ts">
defineProps({
    field: {
        type: Object,
        required: true,
    },
})
</script>

<template>
    <div class="grid gap-2">
        <label :for="field.id">{{ field.label }}</label>
        <div class="flex gap-2">
            <input
                v-for="field in field.fields"
                :type="field.type"
                :id="field.id"
                :name="field.id"
                required
                :placeholder="field.placeholder"
                :autocomplete="field.autocomplete"
                class="w-[50%] rounded-lg border border-[#7AA6C8] px-3 py-3 text-xs text-black outline-none focus:bg-[#7AA6C8]/20 dark:text-[#999999]"
            />
        </div>
    </div>
</template>
