<script setup lang="ts">
import { ref } from 'vue'

const menubar = [
  { icon: 'person', link: '/minha-conta' },
  { icon: 'location_on', link: '/' },
  {
    id: 0,
    icon: 'stacks',
    options: [
      { icon: 'speed_camera', link: '/cameras' },
      { icon: 'signal_cellular_alt', link: '/dashboard' },
    ],
  },
]

const openMenuId = ref<number | null>(null)
const toggleMenu = (id: number) => {
  openMenuId.value = openMenuId.value === id ? null : id
}
</script>

<template>
  <nav
    class="w-full rounded-t-2xl bg-white py-3 text-[#0453AF] shadow-xl dark:bg-[#000d19] dark:text-white"
  >
    <ul class="flex items-center justify-around">
      <li v-for="item in menubar" :key="item.icon">
        <RouterLink v-if="!item.options" :to="item.link" class="flex flex-col items-center">
          <span class="material-symbols-outlined">{{ item.icon }}</span>
          <div class="mt-1 h-1 w-1 rounded-full bg-[#0453AF] dark:bg-white"></div>
        </RouterLink>

        <div v-else>
          <button
            @click="toggleMenu(item.id)"
            :aria-expanded="openMenuId === item.id"
            class="flex flex-col items-center"
          >
            <span class="material-symbols-outlined">{{ item.icon }}</span>
            <div class="mt-1 h-1 w-1 rounded-full bg-[#0453AF] dark:bg-white"></div>
          </button>
          <transition name="fade">
            <ul
              v-if="openMenuId === item.id"
              class="absolute right-10.5 bottom-13.5 z-10 mt-2 grid w-[10vw] gap-2 rounded-lg bg-white px-2 py-5 shadow-lg dark:bg-[#000d19]"
            >
              <li v-for="menu in item.options" :key="menu.id">
                <RouterLink :to="menu.link" class="flex flex-col items-center">
                  <span class="material-symbols-outlined">{{ menu.icon }}</span>
                  <div class="mt-1 h-1 w-1 rounded-full bg-[#0453AF] dark:bg-white"></div>
                </RouterLink>
              </li>
            </ul>
          </transition>
        </div>
      </li>
    </ul>
  </nav>
</template>
