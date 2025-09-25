<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import postsRaw from '/public/info/posts.json'

interface PostItem {
    id: number
    position: number
    title: string
    preview: string
    text: string
    author: string
    date: string
    image: string
    link: string
}

const posts = postsRaw as PostItem[]

const route = useRoute()
const postId = Number(route.params.id)

const post = computed(() => posts.find((p: PostItem) => p.id === postId))
</script>

<template>
    <div v-if="post" class="mx-auto max-w-5xl px-5 py-8 sm:px-10 md:px-15 lg:px-20 xl:px-25">
        <RouterLink
            to="/blog"
            class="mb-4 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-[#2768CA]"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="h-4 w-4"
            >
                <path
                    fill-rule="evenodd"
                    d="M20.25 12a.75.75 0 0 1-.75.75H6.81l4.22 4.22a.75.75 0 0 1-1.06 1.06l-5.5-5.5a.75.75 0 0 1 0-1.06l5.5-5.5a.75.75 0 1 1 1.06 1.06L6.81 11.25H19.5a.75.75 0 0 1 .75.75Z"
                    clip-rule="evenodd"
                />
            </svg>
            Voltar ao blog
        </RouterLink>

        <div class="grid gap-2">
            <h2
                class="relative text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100"
            >
                {{ post.title }}
                <i
                    class="pointer-events-none absolute -bottom-1 left-0 block h-1 w-24 rounded-full bg-gradient-to-r from-[#2768CA] to-blue-500"
                ></i>
            </h2>
            <div class="flex flex-wrap items-center gap-x-3 text-sm">
                <span class="font-medium text-[#0453AF]">{{ post.author }}</span>
                <span class="text-gray-400">•</span>
                <span class="text-gray-500 dark:text-gray-400">{{ post.date }}</span>
            </div>
        </div>

        <div
            class="mt-6 overflow-hidden rounded-2xl ring-1 ring-gray-200 ring-inset dark:ring-zinc-800"
        >
            <img
                :src="post.image"
                :alt="post.title"
                loading="lazy"
                class="mx-auto h-auto w-full max-w-4xl object-cover transition duration-300 ease-out"
            />
        </div>

        <Transition
            appear
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="opacity-0 translate-y-2"
            enter-to-class="opacity-100 translate-y-0"
        >
            <div
                class="prose prose-zinc dark:prose-invert mt-6 max-w-none"
                v-html="post.text"
            ></div>
        </Transition>

        <div class="mt-10">
            <div
                class="my-6 h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-gray-800"
            ></div>
            <div
                class="flex flex-col items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-white/60 p-4 ring-1 ring-gray-100 ring-inset sm:flex-row dark:border-zinc-800 dark:bg-zinc-900/60 dark:ring-zinc-800"
            >
                <p class="text-center text-sm text-gray-600 sm:text-left dark:text-gray-300">
                    Chegou ao fim da leitura?
                </p>
                <button
                    type="button"
                    @click="scrollToTop"
                    class="inline-flex items-center gap-2 rounded-full bg-[#2768CA] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2768CA]/60"
                    aria-label="Voltar ao topo"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="h-4 w-4"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M12 3.75a.75.75 0 0 1 .75.75v12.69l4.22-4.22a.75.75 0 1 1 1.06 1.06l-5.5 5.5a.75.75 0 0 1-1.06 0l-5.5-5.5a.75.75 0 1 1 1.06-1.06l4.22 4.22V4.5A.75.75 0 0 1 12 3.75Z"
                            clip-rule="evenodd"
                        />
                    </svg>
                    Voltar ao topo
                </button>
            </div>
        </div>
    </div>
    <div v-else class="p-10 text-center text-gray-700 lg:text-lg dark:text-gray-300">
        <p>Post não encontrado.</p>
    </div>
</template>
