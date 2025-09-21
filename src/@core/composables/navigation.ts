import { useRouter } from 'vue-router'

export function useNavigation() {
    const router = useRouter()

    function routerBack() {
        router.back()
    }

    function goHome() {
        router.push('/')
    }

    return {
        routerBack,
        goHome,
    }
}
