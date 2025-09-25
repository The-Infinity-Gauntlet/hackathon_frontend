<script setup lang="ts">
import { Publications } from '../components'
import posts from '/public/info/posts.json'
</script>

<template>
    <div class="px-5 pb-24">
        <section class="max-w-7xl py-8">
            <h1 class="grid gap-2 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-6xl">
                Blog
                <span
                    class="bg-gradient-to-r from-[#2768CA] to-blue-500 bg-clip-text text-transparent"
                >
                    Informativo
                </span>
            </h1>
            <p class="mt-4 max-w-3xl text-sm text-gray-600 lg:text-base dark:text-gray-300">
                Causas, consequências, histórias e soluções num só lugar. Entenda e acompanhe as
                informações sobre enchentes e o impacto das chuvas em
                <span class="font-semibold text-black dark:text-white">Joinville</span>.
            </p>
        </section>

        <div class="mx-auto max-w-7xl">
            <div
                class="my-4 h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-gray-800"
            ></div>

            <section class="px-1 py-4 sm:px-0">
                <h2
                    class="py-4 text-base font-semibold text-gray-900 lg:text-xl dark:text-gray-100"
                >
                    Publicações mais acessadas
                </h2>
                <TransitionGroup
                    appear
                    tag="ul"
                    class="divide-y divide-gray-100 overflow-hidden rounded-xl border border-gray-100 bg-white/40 backdrop-blur dark:divide-gray-800 dark:border-gray-800 dark:bg-zinc-900/40"
                    enter-active-class="transition duration-200 ease-out"
                    enter-from-class="opacity-0 translate-y-1"
                    enter-to-class="opacity-100 translate-y-0"
                >
                    <li
                        v-for="post in posts"
                        :key="post.id"
                        class="group flex items-center justify-between gap-4 p-4 transition-colors hover:bg-gray-50/70 dark:hover:bg-white/5"
                    >
                        <RouterLink
                            :to="post.link"
                            class="flex flex-1 items-center gap-4 focus:outline-none"
                        >
                            <span
                                class="grid h-8 w-8 place-content-center rounded-full bg-gray-200 text-sm font-bold text-gray-800 ring-1 ring-gray-300 transition ring-inset group-hover:bg-[#2768CA] group-hover:text-white group-hover:ring-[#2768CA] dark:bg-zinc-800 dark:text-gray-200 dark:ring-zinc-700"
                            >
                                {{ post.position }}
                            </span>
                            <span
                                class="relative flex-1 text-sm font-medium text-gray-900 transition group-hover:text-[#2768CA] dark:text-gray-100"
                            >
                                {{ post.title }}
                                <i
                                    class="pointer-events-none absolute -bottom-0.5 left-0 h-0.5 w-0 bg-[#2768CA] transition-all duration-200 group-hover:w-full"
                                ></i>
                            </span>
                        </RouterLink>
                        <RouterLink
                            :to="post.link"
                            aria-label="Abrir publicação"
                            class="shrink-0 rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-[#2768CA] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2768CA] dark:text-gray-400 dark:hover:bg-white/5"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                class="h-5 w-5"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M4.5 12a.75.75 0 0 1 .75-.75h12.69l-4.22-4.22a.75.75 0 1 1 1.06-1.06l5.5 5.5a.75.75 0 0 1 0 1.06l-5.5 5.5a.75.75 0 1 1-1.06-1.06l4.22-4.22H5.25A.75.75 0 0 1 4.5 12Z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        </RouterLink>
                    </li>
                </TransitionGroup>

                <div class="mt-8">
                    <Publications :posts="posts" />
                </div>
            </section>
        </div>
    </div>
</template>
