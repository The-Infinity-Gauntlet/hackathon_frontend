import { defineStore } from 'pinia'
import { ref } from 'vue'

export type AlertKey = 'CRISE!' | 'ALERTA!' | 'ATENÇÃO!' | 'MOBILIZAÇÃO!' | 'NORMALIDADE!'

export const useAlertStore = defineStore('alert', () => {
    // estado inicial (pode ser "NORMALIDADE!" ou o que preferir)
    const alert = ref<AlertKey>('NORMALIDADE!')

    // action para mudar o valor
    function setAlert(newAlert: AlertKey) {
        alert.value = newAlert
    }

    return {
        alert,
        setAlert,
    }
})
