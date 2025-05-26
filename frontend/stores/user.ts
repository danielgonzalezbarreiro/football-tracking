import { defineStore } from 'pinia'

interface User {
  _id: string
  name: string
  email: string
  favoriteTeams: number[]
}

interface AuthState {
  user: User | null
  token: string | null
  favoriteTeams: number[]
}

export const useUserStore = defineStore('user', {
  state: (): AuthState => ({
    user: null,
    token: null,
    favoriteTeams: []
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    setUser(user: User) {
      this.user = {
        ...user,
        favoriteTeams: user.favoriteTeams?.map(id => Number(id)) || []
      }
      this.favoriteTeams = this.user.favoriteTeams
      localStorage.setItem('user', JSON.stringify(this.user))
    },
    setToken(token: string) {
      this.token = token
      localStorage.setItem('token', token)
    },
    setFavoriteTeams(teamsIds: number[]) {
      this.favoriteTeams = teamsIds
      if (this.user) {
        this.user = { ...this.user, favoriteTeams: teamsIds }
      }
    },
    addFavoriteTeam(teamId: number) {
      if (!this.favoriteTeams.includes(teamId)) {
        this.favoriteTeams = [...this.favoriteTeams, teamId]
        if (this.user) {
          this.user = { ...this.user, favoriteTeams: this.favoriteTeams }
        }
      }
    },
    removeFavoriteTeam(teamId: number | string) {
      const idNum = typeof teamId === 'string' ? Number(teamId) : teamId
      const updatedFavorites = this.favoriteTeams.filter(id => id !== idNum)

      this.favoriteTeams = updatedFavorites
    
      if (this.user) {
        this.user = { ...this.user, favoriteTeams: updatedFavorites }
        localStorage.setItem('user', JSON.stringify(this.user))
      }
    },
    logout() {
      this.user = null
      this.token = null
      this.favoriteTeams = []
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
   loadFromStorage() {
      const token = localStorage.getItem('token')
      const user = localStorage.getItem('user')
      if (token) this.token = token
      if (user) {
        const parsedUser = JSON.parse(user)
        this.user = {
          ...parsedUser,
          favoriteTeams: parsedUser.favoriteTeams?.map((id: any) => Number(id)) || []
        }
        if(this.user) this.favoriteTeams = this.user.favoriteTeams
      }
    },
    syncUserToStorage() {
      if (this.user) {
        localStorage.setItem('user', JSON.stringify(this.user))
      }
    }
  }
})
