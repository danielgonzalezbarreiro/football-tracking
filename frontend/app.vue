<template>
  <div data-theme="abyss" class="min-h-screen">
    <NavBar />
    <NuxtPage />
  </div>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue'
useHead({
  htmlAttrs: {
    'data-theme': 'abyss'
  }
})
import { useAuth } from '@/composables/useAuth'
const { initAuth } = useAuth()
onBeforeMount(() => {
  initAuth()
})
</script>