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
}

export const useUserStore = defineStore('user', {
  state: (): AuthState => ({
    user: null,
    token: null,
  }),
  actions: {
    setUser(user: User) {
      this.user = user
    },
    setToken(token: string) {
      this.token = token
      localStorage.setItem('token', token)
    },
    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
    },
    loadFromStorage() {
      const token = localStorage.getItem('token')
      if (token) {
        this.token = token
      }
    }
  },
})