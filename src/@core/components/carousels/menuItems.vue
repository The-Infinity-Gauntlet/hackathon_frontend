<script setup lang="ts">
defineProps<{
    item: Object
}>()
</script>

<template>
    <div
        :class="item.id % 2 == 0 ? 'bg-[#2768CA] text-white' : 'bg-[#E5E5E5] text-[#999999]'"
        class="grid h-[160px] w-[140px] rounded-2xl p-3 text-center text-sm lg:h-[200px] lg:w-[180px] lg:rounded-md"
    >
        <RouterLink :to="item.link" class="grid w-full grid-rows-[1fr_auto] gap-3">
            <div class="flex items-center justify-center">
                <p class="font-semibold lg:text-lg">{{ item.label }}</p>
            </div>
            <div class="flex w-full flex-col items-center">
                <hr class="mb-2 w-full border-[#003E86]" />
                <span class="material-symbols-outlined text-[#003E86]">
                    {{ item.icon }}
                </span>
            </div>
        </RouterLink>
    </div>
</template>
