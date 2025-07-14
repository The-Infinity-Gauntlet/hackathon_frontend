import { useRouter } from 'vue-router'

export function useRouterBack() {
  const router = useRouter()

  function routerBack() {
    router.back()
  }

  return {
    routerBack,
  }
}
