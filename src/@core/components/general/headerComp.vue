<script setup lang="ts">
import { ref } from 'vue'
import { ThemeSwitcher } from '@/@core/components'
import { useNavigation } from '@/@core/composables/navigation'

defineProps<{ title?: string }>()

const { routerBack } = useNavigation()
const openMenuId = ref<number | null>(null)
const toggleMenu = (id: number) => {
  openMenuId.value = openMenuId.value === id ? null : id
}

interface MenuItem {
  id: number
  label: string
  link?: string
  img?: string
  options?: { id: number; label: string; link: string }[]
}

const desktopMenu: MenuItem[] = [
  { id: 0, img: '/icons/logo.svg', label: 'Aqua', link: '/' },
  { id: 1, label: 'Home', link: '/' },
  { id: 2, label: 'Administração', link: '/admin' },
  { id: 3, label: 'Minha conta', link: '/minha-conta' },
  {
    id: 4,
    label: 'Mais',
    options: [
      { id: 0, label: 'Home', link: '/' },
      { id: 1, label: 'Administração', link: '/admin' },
      { id: 2, label: 'Minha conta', link: '/minha-conta' },
    ],
  },
]
</script>

<template>
  <header class="z-10 px-7 lg:px-20 lg:shadow-md xl:px-25">
    <nav class="lg:flex lg:items-center lg:justify-between">
      <ul class="flex items-center justify-between lg:hidden">
        <li>
          <button class="material-symbols-outlined text-[#999999]" @click="routerBack">
            arrow_back_ios
          </button>
        </li>
        <li>
          <img src="/icons/logo.svg" alt="Aqua" class="ml-3" />
        </li>
        <li>
          <ThemeSwitcher />
        </li>
      </ul>

      <ul class="hidden items-center gap-7 lg:flex">
        <li v-for="item in desktopMenu" :key="item.id" class="relative cursor-pointer">
          <RouterLink v-if="item.img" :to="item.link">
            <img :src="item.img" :alt="item.label" class="h-20 w-20" />
          </RouterLink>

          <RouterLink v-else-if="!item.options" :to="item.link">
            {{ item.label }}
          </RouterLink>

          <div v-else>
            <button @click="toggleMenu(item.id)" :aria-expanded="openMenuId === item.id"
              class="flex cursor-pointer items-center">
              {{ item.label }}
              <span class="material-symbols-outlined transition-all duration-300 ease-out"
                :class="openMenuId === item.id ? 'rotate-180' : 'rotate-0'">keyboard_arrow_down</span>
            </button>
            <transition name="fade">
              <ul v-if="openMenuId === item.id"
                class="absolute mt-2 grid w-[15vw] gap-2 rounded-lg bg-white px-5 py-5 shadow-lg dark:bg-[#000d19]">
                <li v-for="menu in item.options" :key="menu.id"
                  class="border-b border-[#000D19] p-2 text-center dark:border-white">
                  <RouterLink :to="menu.link">{{ menu.label }}</RouterLink>
                </li>
              </ul>
            </transition>
          </div>
        </li>
      </ul>
      <ThemeSwitcher class="hidden lg:block" />
    </nav>
  </header>

  <div class="grid lg:hidden">
    <h1 class="text-center">{{ title }}</h1>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
