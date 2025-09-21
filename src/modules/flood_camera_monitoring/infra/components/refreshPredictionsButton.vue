<script setup lang="ts">
import { ref } from 'vue'
import { useFloodCameraMonitoringController } from '../../controller/FloodCameraMonitoringController'
import { FloodPredictionsRepository } from '../../repositories/FloodPredictionsRepository'
import { container } from 'tsyringe'

const loading = ref(false)
const error = ref<string | null>(null)

const ctrl = useFloodCameraMonitoringController()
const predsRepo = container.resolve(FloodPredictionsRepository)

const refresh = async () => {
    loading.value = true
    error.value = null
    try {
        await predsRepo.refreshSync()
        await ctrl.load() // recarrega lista após refresh
    } catch (e: any) {
        error.value = e?.message ?? 'Falha ao atualizar histórico'
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <div class="inline-flex items-center gap-2">
        <button
            type="button"
            class="rounded-md bg-blue-500 px-3 py-1.5 text-white transition-colors duration-300 hover:bg-blue-600 disabled:opacity-60"
            :disabled="loading"
            @click="refresh"
        >
            {{ loading ? 'Atualizando…' : 'Atualizar histórico' }}
        </button>
        <span v-if="error" class="text-xs text-red-600">{{ error }}</span>
    </div>
</template>
