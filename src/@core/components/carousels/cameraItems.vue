<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import {
    HlsStreamPlayer,
    EmbedStreamPlayer,
} from '@/modules/flood_camera_monitoring/infra/components'

const props = defineProps<{
    item: Object
}>()

const modes = reactive<Record<string, ViewMode>>({})

onMounted(async () => {
    item.forEach((c: any) => {
        modes[c.id] = 'hls'
    })
})
</script>

<template>
    <div class="relative">
        <EmbedStreamPlayer
            v-if="modes[item.id] === 'embed' && item.embed_url"
            :src="item.embed_url"
            :title="item.name"
            class="h-full w-full"
        />
        <HlsStreamPlayer
            v-else
            :src="item.hls_url"
            :muted="true"
            :controls="true"
            :lock-to-live="true"
            :live-delay="18"
            class="h-full w-full"
        />
    </div>
</template>
