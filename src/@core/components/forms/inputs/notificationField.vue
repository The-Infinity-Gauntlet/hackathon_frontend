<script setup lang="ts">
import { ref } from 'vue'
import { ButtonGlassmorphism } from '@/@core/components'

const props = defineProps<{
    historyNotifications: array
}>()

const selected = ref<number | null>(null)
</script>

<template>
    <label v-for="notification in historyNotifications" :key="notification.id">
        <input
            type="radio"
            name="method"
            :value="notification.id"
            v-model="selected"
            class="peer hidden"
        />
        <div
            class="my-3 flex cursor-pointer items-center justify-between rounded-2xl border-2 border-transparent bg-[#F3F3F3] p-5 text-black transition peer-checked:border-blue-600 dark:bg-[#00182F]"
        >
            <div class="w-[60%]">
                <h4>{{ notification.alert }}</h4>
                <p class="text-sm">{{ notification.message }}</p>
                <p class="mt-2 flex items-center gap-1 text-xs text-[#999999]">
                    <span class="material-symbols-outlined">location_on</span>
                    {{ notification.neighborhood }}
                </p>
            </div>
            <img
                :src="notification.icon"
                :alt="notification.alert"
                class="mr-3 h-8 w-8 object-cover"
            />
        </div>
    </label>
</template>
