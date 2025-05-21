<template>
  <div data-theme="abyss" class="min-h-screen">
    <NuxtPage />
  </div>
</template>

<script setup>
useHead({
  htmlAttrs: {
    'data-theme': 'abyss'
  }
})
</script>