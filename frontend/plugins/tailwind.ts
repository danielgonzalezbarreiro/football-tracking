import '~/assets/css/tailwind.css'
import '~/assets/css/abyss-theme.css'

export default defineNuxtPlugin(() => {
  if (process.client) {
    document.documentElement.setAttribute('data-theme', 'abyss')
  }
})