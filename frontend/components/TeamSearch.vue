<template>
  <div class="mb-8">
    <form @submit.prevent="handleSearch" class="flex gap-2 mb-4">
      <input
        v-model="search"
        type="text"
        placeholder="Search team by name"
        class="input input-bordered w-full"
      />
      <button type="submit" class="btn btn-primary">Search</button>
    </form>
    <div v-if="loading" class="text-center">Searching teams...</div>
    <div v-if="error" class="text-red-500">{{ error }}</div>
    <ul v-if="results.length" class="space-y-2">
      <li v-for="team in results" :key="team.id" class="flex items-center justify-between p-2 border rounded">
        <div class="flex items-center gap-2">
          <img :src="team.logo" alt="logo" class="w-8 h-8" />
          <span>{{ team.name }} ({{ team.country }})</span>
        </div>
        <button
          class="btn btn-success btn-sm"
          :disabled="isFavorite(team.id) || favoriteTeams.length >= maxFavorites"
          @click="$emit('add', team)"
          :aria-disabled="isFavorite(team.id) || favoriteTeams.length >= maxFavorites"
        >
          Añadir
        </button>
      </li>
    </ul>
    <div v-else-if="searched && !loading" class="text-gray-500">No teams were found</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTeams } from '~/composables/useTeams'
import type { TeamDetails } from '~/composables/useTeams'

const config = useRuntimeConfig()
const maxFavorites = Number(config.public.maxFavorites)

const props = defineProps<{
  favoriteTeams: number[]
}>()
const emit = defineEmits(['add'])

const search = ref('')
const results = ref<TeamDetails[]>([])
const loading = ref(false)
const error = ref('')
const searched = ref(false)

const { searchTeamsByName } = useTeams()

const handleSearch = async () => {
  if (!search.value.trim()) return
  loading.value = true
  error.value = ''
  searched.value = false
  try {
    results.value = await searchTeamsByName(search.value)
    searched.value = true
  } catch (e: any) {
    error.value = e?.message || String(e)
  } finally {
    loading.value = false
  }
}

const isFavorite = (teamId: number) => props.favoriteTeams.includes(teamId)
</script>