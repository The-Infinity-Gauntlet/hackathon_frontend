<script setup lang="ts">
function requestPermissionAndNotify() {
    Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
            console.log('Notification permission granted.')

            const notification = {
                title: 'Test Notification',
                body: 'This is a test notification from your PWA!',
                icon: '/pwa_icons/pwa-192x192.png',
            }

            navigator.serviceWorker.ready.then((registration) => {
                registration.showNotification(notification.title, {
                    body: notification.body,
                    icon: notification.icon,
                })
            })
        } else {
            console.log('Unable to get permission to notify.')
        }
    })
}
</script>

<template>
    <button
        class="mx-auto rounded-lg bg-[#42B983] p-2 text-white"
        @click="requestPermissionAndNotify"
    >
        Enable Notifications
    </button>
</template>
