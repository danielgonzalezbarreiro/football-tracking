import { useUserStore } from '~/stores/user'

export interface TeamDetails {
  id: number
  name: string
  logo: string
  country: string
}

export function useTeams() {
  const userStore = useUserStore()
  const { $api } = useNuxtApp()

  const getUserTeams = async (): Promise<number[]> => {
    try {
      const response = await $api.get<number[]>('/users/favorite-teams')
      userStore.setFavoriteTeams(response.data)
      return response.data
    } catch (error: any) {
      console.error('Error al cargar los equipos favoritos:', error)
      throw error.response?.data?.message || 'Error al cargar los equipos favoritos'
    }
  }

  const searchTeamsByName = async (name: string): Promise<TeamDetails[]> => {
    try {
      const response = await $api.get(`/football-data/teams?name=${encodeURIComponent(name)}`)
      return response.data.response.map((item: any) => ({
        id: item.team.id,
        name: item.team.name,
        logo: item.team.logo,
        country: item.team.country,
      }))
    } catch (error: any) {
      console.error('Error al buscar equipos:', error)
      throw error.response?.data?.message || 'Error al buscar equipos'
    }
  }

  const addTeamToFavorites = async (teamId: number): Promise<void> => {
    try {
      await $api.post('/users/favorite-teams', { teamId })
      userStore.addFavoriteTeam(teamId)
      userStore.syncUserToStorage()
    } catch (error: any) {
      throw error.response?.data?.message || 'Error al añadir equipo a favoritos'
    }
  }

  const removeTeamFromFavorites = async (teamId: number): Promise<void> => {
    try {
      await $api.delete(`/users/favorite-teams/${teamId}`)
      userStore.removeFavoriteTeam(teamId)
      userStore.syncUserToStorage()
    } catch (error: any) {
      throw error.response?.data?.message || 'Error al eliminar equipo de favoritos'
    }
  }

  const getTeamDetails = async (teamId: number): Promise<TeamDetails> => {
    try {
      const response = await $api.get(`/football-data/teams/${teamId}`)
      return response.data.response[0].team
    } catch (error: any) {
      throw error.response?.data?.message || 'Error al cargar detalles del equipo'
    }
  }

  const getNextFixturesByTeamId = async (teamId: number): Promise<any> => {
    try {
      const response = await $api.get(`/football-data/next-fixtures?teamId=${teamId}`)
      return response.data.response
    } catch (error: any) {
      console.error('Error al cargar próximos partidos:', error)
      throw error.response?.data?.message || 'Error al cargar próximos partidos'
    }
  }

  return {
    getUserTeams,
    searchTeamsByName,
    addTeamToFavorites,
    removeTeamFromFavorites,
    getTeamDetails,
    getNextFixturesByTeamId
  }
}
