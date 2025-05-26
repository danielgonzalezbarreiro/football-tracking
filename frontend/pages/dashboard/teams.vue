<template>
  <div class="container mx-auto max-w-screen-md py-8 px-4 text-center">
    <h1 class="text-2xl font-bold mb-6" >Favorite teams</h1>

    <button class="btn btn-primary mb-4" @click="showAddModal = true">
      Add favorite team
    </button>
    <ModalAddFavoriteTeam
      :open="showAddModal"
      :favoriteTeams="favoriteTeams"
      @close="showAddModal = false"
      @add="handleAddFavorite"
    />

    <FavoriteTeamsList
      :favoriteTeams="favoriteTeams"
      :teamDetails="favoriteTeamDetails"
      @remove="handleRemoveFavorite"
    />

    <UpcomingMatchesList :matches="upcomingMatches" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue'
import { useTeams, type TeamDetails } from '~/composables/useTeams'
import { useUserStore } from '~/stores/user'
import FavoriteTeamsList from '@/components/FavoriteTeamsList.vue'
import UpcomingMatchesList from '@/components/UpcomingMatchesList.vue'
import ModalAddFavoriteTeam from '@/components/ModalAddFavoriteTeam.vue'

const { getUserTeams, getTeamDetails, addTeamToFavorites, removeTeamFromFavorites, getNextFixturesByTeamId } = useTeams()
const userStore = useUserStore()

const favoriteTeams = computed(() => userStore.favoriteTeams)
const favoriteTeamDetails = ref<TeamDetails[]>([])
const upcomingMatches = ref<any[]>([])
const showAddModal = ref(false)

const fetchFavoriteTeamDetails = async () => {
  if (favoriteTeams.value.length === 0) {
    favoriteTeamDetails.value = []
    return
  }
  favoriteTeamDetails.value = await Promise.all(
    favoriteTeams.value.map(id => getTeamDetails(id))
  )
}

const fetchUpcomingMatches = async () => {
  if (favoriteTeams.value.length === 0) {
    upcomingMatches.value = []
    return
  }
  const allMatches = await Promise.all(
    favoriteTeams.value.map(id => getNextFixturesByTeamId(id))
  )
  upcomingMatches.value = allMatches.flat().sort((a, b) => new Date(a.fixture.date).getTime() - new Date(b.fixture.date).getTime())
}

watch(favoriteTeams, () => {
  fetchFavoriteTeamDetails()
  fetchUpcomingMatches()
}, { immediate: true })

const handleAddFavorite = async (team: TeamDetails) => {
  await addTeamToFavorites(team.id)
  await getUserTeams()
}

const handleRemoveFavorite = async (teamId: number) => {
  await removeTeamFromFavorites(teamId)
  await getUserTeams()
}

onMounted(async () => {
  await userStore.loadFromStorage()
  await getUserTeams()
})
</script>

