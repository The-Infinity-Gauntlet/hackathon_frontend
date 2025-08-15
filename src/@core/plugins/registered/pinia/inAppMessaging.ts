import { defineStore } from 'pinia'

export const useInAppMessagingStore = defineStore('inAppMessaging', {
  state: () => ({
    messages: [] as { id: number; text: string }[],
  }),
  actions: {
    addMessage(text: string) {
      const id = Date.now()
      this.messages.push({ id, text })

      setTimeout(() => this.removeMessage(id), 5000)
    },
    removeMessage(id: number) {
      this.messages = this.messages.filter((msg) => msg.id !== id)
    },
  },
})
