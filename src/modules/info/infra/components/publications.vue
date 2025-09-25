<script setup lang="ts">
interface IPublications {
    id: string | number
    position: string | number
    title: string
    preview: string
    text: string
    author: string
    date: string
    image: string
    link: string
}

defineProps<{
    posts: IPublications[]
}>()
</script>

<template>
    <h2 class="py-5 text-base font-semibold text-gray-900 lg:text-xl dark:text-gray-100">
        Publicações
    </h2>

    <div class="lg:mx-auto">
        <TransitionGroup
            appear
            tag="ul"
            class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="opacity-0 translate-y-2"
            enter-to-class="opacity-100 translate-y-0"
        >
            <li v-for="post in posts" :key="post.id" class="h-full">
                <RouterLink
                    :to="post.link"
                    :aria-label="`Abrir publicação: ${post.title}`"
                    class="group relative block h-full overflow-hidden rounded-2xl border border-gray-100 bg-white/60 shadow-sm ring-1 ring-gray-100 transition ring-inset hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2768CA] dark:border-zinc-800 dark:bg-zinc-900/60 dark:ring-zinc-800"
                >
                    <div
                        class="relative aspect-[16/10] w-full overflow-hidden bg-gray-200 dark:bg-zinc-800"
                    >
                        <img
                            :src="post.image"
                            :alt="post.title"
                            loading="lazy"
                            class="h-full w-full object-cover transition duration-300 ease-out group-hover:scale-105"
                        />
                        <div
                            class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        ></div>

                        <div
                            class="pointer-events-none absolute inset-x-0 bottom-0 translate-y-3 p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                        >
                            <span
                                class="inline-flex items-center gap-2 rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur dark:bg-white/10"
                            >
                                Ler artigo
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    class="h-4 w-4"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M4.5 12a.75.75 0 0 1 .75-.75h12.69l-4.22-4.22a.75.75 0 1 1 1.06-1.06l5.5 5.5a.75.75 0 0 1 0 1.06l-5.5 5.5a.75.75 0 1 1-1.06-1.06l4.22-4.22H5.25A.75.75 0 0 1 4.5 12Z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                            </span>
                        </div>
                    </div>
                    <div class="space-y-2 p-4">
                        <p
                            class="line-clamp-2 text-sm font-semibold text-[#2768CA] transition group-hover:underline lg:text-base"
                        >
                            {{ post.title }}
                        </p>
                        <p class="line-clamp-3 text-sm text-gray-600 dark:text-gray-300">
                            {{ post.preview }}
                        </p>
                        <p class="pt-1 text-xs font-medium text-gray-700 dark:text-gray-300">
                            Autor:
                            <span class="font-normal text-gray-500 dark:text-gray-400">
                                {{ post.author }}
                            </span>
                        </p>
                    </div>
                </RouterLink>
            </li>
        </TransitionGroup>
    </div>
</template>
