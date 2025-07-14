import { ref, onMounted, watch } from 'vue'

const isDark = ref(false)

const toggleTheme = () => {
  isDark.value = !isDark.value
}

const initializeTheme = () => {
  const savedTheme = localStorage.getItem('theme') // verifica se o usuário já escolheu um tema
  if (savedTheme) {
    isDark.value = savedTheme === 'dark'
  } else {
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches // usa a preferência do sistema operacional
  }
}

watch(isDark, (newVal) => {
  if (newVal) {
    document.documentElement.classList.add('dark') // add class dark no html
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
})

export function useTheme() {
  onMounted(initializeTheme)

  return {
    isDark,
    toggleTheme,
  }
}
