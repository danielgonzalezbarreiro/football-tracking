import { useUserStore } from '~/stores/user'
import { defineNuxtRouteMiddleware, navigateTo } from '#app'

export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore()
  if (!userStore.token && to.path.startsWith('/dashboard')) {
    return navigateTo('/login')
  }
})