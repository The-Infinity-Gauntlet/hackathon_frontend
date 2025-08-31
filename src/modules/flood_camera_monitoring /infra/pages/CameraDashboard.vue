<script setup lang="ts">
import { HlsStreamPlayer, EmbedStreamPlayer } from '../components'
import { reactive } from 'vue'

type Camera = { name: string; url: string; embed_url?: string }

const cameras: Camera[] = [
  {
    name: 'Centro: Avenida JK',
    url: 'https://connect-92.servicestream.io:8050/bcc84c859ab7.m3u8',
    embed_url:
      'https://www.khronosaovivo2.com.br/#/cembed/83e3785a96f4e4a6f4b92b74ecf6a398e54ef285998f4d130aefa755f4155d66896770236366590e3975f90e4a00',
  },
  {
    name: 'Centro: Praça da Bandeira',
    url: 'https://connect-120.servicestream.io:8050/e7f57bcc97a2.m3u8',
    embed_url:
      'https://www.khronosaovivo2.com.br/#/cembed/8ee5d57ad06e2061f0f6903a7654f8922b2c26b9098bbe535182d9085e110faf78eb8772f018b50a712e92bd95e6',
  },
  {
    name: 'Centro: Terminal Central',
    url: 'https://connect-579.servicestream.io:8050/af40aca3a9f5.m3u8',
    embed_url:
      'https://www.khronosaovivo2.com.br/#/cembed/5c66bc8e221159732d5bbe758995800a8aebedd43d116695a32d19ec28bde07188211f37c8b4243f221f4f1d0fff',
  },
  {
    name: 'Rio Cachoeira: Terminal Norte',
    url: 'https://connect-92.servicestream.io:8050/85148626746f.m3u8',
    embed_url:
      'https://www.khronosaovivo2.com.br/#/cembed/31237a32ad9912f2e817708c1875a9058fece000d303b4943f356db1a958ec17b39ada66462fdb3fcb917fd6486a',
  },
  {
    name: 'Águas Vermelhas: Rua Leopoldo Beninca',
    url: 'https://connect-369.servicestream.io:8050/74117f48e66e.m3u8',
    embed_url:
      'https://www.khronosaovivo2.com.br/#/cembed/c654b0714cc1a080db45a60678ecc951af3e8a531847756b9ab1b3f916a32869207aa363704fd9b5967a4aadf178',
  },
  {
    name: 'Paranaguamirim: Rua 6 de Janeiro',
    url: 'https://connect-451.servicestream.io:8050/6272496274c1.m3u8',
    embed_url:
      'https://www.khronosaovivo2.com.br/#/cembed/984be5c620e7d2cc5571aa84f560b11558c4c2fd5ebf6ee547a55f579a5ebbeb05898dc008437e2124498ed96e8b',
  },
  {
    name: 'Rio Águas Vermelhas: Rua Minas Gerais',
    url: 'https://connect-524.servicestream.io:8050/84b8b97bcdde.m3u8',
    embed_url:
      'https://www.khronosaovivo2.com.br/#/cembed/39858ef78be1f3117cd2dbd2f343bd3eabd9137fe6365ee64a99f7e316d07f4a08c50b51833b52e28c12288efde6',
  },
  {
    name: 'Rio do Braço: Jardim Sofia',
    url: 'https://connect-524.servicestream.io:8050/9980ca324f48.m3u8',
    embed_url:
      'https://www.khronosaovivo2.com.br/#/cembed/7d2551870cb4ca9f5a27b84391243775eaedad995dfd7e181d5430a000f0833961ba58cfcd5dbb88c9dd431cfc74',
  },
  {
    name: 'Rio Cubatão: Ponte Quiriri',
    url: 'https://connect-524.servicestream.io:8050/d350ed83141b.m3u8',
    embed_url:
      'https://www.khronosaovivo2.com.br/#/cembed/0036bc1e904dd525448d9ae00a3c6fed7376e4205484fe2c01dc6f0392e657822c55cbf8e2775fc904a95b7f8013',
  },
  {
    name: 'Rio Cubatão: Canal',
    url: 'https://connect-92.servicestream.io:8050/3ab8e7fd6566.m3u8',
    embed_url:
      'https://www.khronosaovivo2.com.br/#/cembed/2e10c3f047ee6c80ae1ab16007263263006deedc08b2cf0fd401f43ee84bd4f9bea27d13f154969fea863650e16f',
  },
  {
    name: 'Rio Cachoeira: Prefeitura',
    url: 'https://connect-272.servicestream.io:8050/919bd92b8436.m3u8',
    embed_url:
      'https://www.khronosaovivo2.com.br/#/cembed/e4fc2988b4bd8f292163de0ac6e46d6074bc223d3b9d096f645050e97eed3161c94abc6827cebb53bc924e4ed1b8',
  },
]
type ViewMode = 'embed' | 'hls'
const modes = reactive<Record<string, ViewMode>>(
  Object.fromEntries(
    cameras.map((c) => [c.url, c.embed_url ? ('embed' as ViewMode) : ('hls' as ViewMode)]),
  ),
)
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-900">
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 class="mb-6 text-2xl font-semibold text-slate-900 sm:text-3xl dark:text-slate-100">
        Monitor de Câmeras
      </h1>

      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        <div
          v-for="cam in cameras"
          :key="cam.url"
          class="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200/60 transition-shadow hover:shadow-md dark:bg-slate-800 dark:ring-slate-700"
        >
          <div
            class="flex items-center justify-between border-b border-slate-100 px-4 py-3 text-sm dark:border-slate-700"
          >
            <div class="font-medium text-slate-700 dark:text-slate-200">
              {{ cam.name }}
            </div>
            <div class="flex gap-1">
              <button
                type="button"
                class="rounded-md px-2 py-1 text-xs font-semibold ring-1 ring-slate-300 dark:ring-slate-600"
                :class="
                  modes[cam.url] === 'embed'
                    ? 'bg-emerald-600 text-white ring-emerald-600'
                    : 'bg-transparent text-slate-600 dark:text-slate-300'
                "
                :disabled="!cam.embed_url"
                @click="modes[cam.url] = 'embed'"
                title="Realtime (Embed)"
              >
                Realtime
              </button>
              <button
                type="button"
                class="rounded-md px-2 py-1 text-xs font-semibold ring-1 ring-slate-300 dark:ring-slate-600"
                :class="
                  modes[cam.url] === 'hls'
                    ? 'bg-blue-600 text-white ring-blue-600'
                    : 'bg-transparent text-slate-600 dark:text-slate-300'
                "
                @click="modes[cam.url] = 'hls'"
                title="HLS"
              >
                HLS
              </button>
            </div>
          </div>

          <div class="aspect-video">
            <EmbedStreamPlayer
              v-if="modes[cam.url] === 'embed' && cam.embed_url"
              :src="cam.embed_url"
              :title="cam.name"
            />
            <HlsStreamPlayer
              v-else
              :src="cam.url"
              :muted="true"
              :controls="true"
              :lock-to-live="true"
              :live-delay="18"
              class="h-full w-full"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
