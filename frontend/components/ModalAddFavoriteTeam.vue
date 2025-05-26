<template>
  <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div
      class="container rounded-lg shadow-lg p-6 w-full max-w-md relative max-h-[90vh] overflow-y-auto"
    >
      <button class="absolute top-2 right-2 text-gray-500 hover:text-gray-700" @click="$emit('close')">✕</button>
      <h2 class="text-xl font-bold mb-4">Add favorite team</h2>
      
      <TeamSearch :favoriteTeams="favoriteTeams" @add="onAdd" />
    </div>
    
  </div>
</template>

<script setup lang="ts">
import TeamSearch from './TeamSearch.vue'

const props = defineProps<{
  open: boolean
  favoriteTeams: number[]
}>()

const emit = defineEmits(['close', 'add'])

const onAdd = (team: any) => emit('add', team)
</script>
