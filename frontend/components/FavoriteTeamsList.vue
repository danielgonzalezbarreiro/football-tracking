<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Your favorite teams</h2>

    <div v-if="teamDetails.length === 0" class="text-gray-500">
      You don't have any favorite teams
    </div>

    <ul v-else class="space-y-2">
      <li
        v-for="team in teamDetails"
        :key="team.id"
        class="flex items-center justify-between p-2 border rounded"
      >
        <div class="flex items-center gap-2">
          <img :src="team.logo" alt="logo" class="w-8 h-8" />
          <span>{{ team.name }} ({{ team.country }})</span>
        </div>
        <button
          class="btn btn-error btn-sm"
          @click="$emit('remove', team.id)"
        >
          Eliminar
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { TeamDetails } from '~/composables/useTeams'

defineProps<{
  favoriteTeams: number[]
  teamDetails: TeamDetails[]
}>()

defineEmits(['remove'])
</script>
