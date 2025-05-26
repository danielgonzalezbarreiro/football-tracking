import { useUserStore } from "~/stores/user";
import { computed } from 'vue'

export function useAuth() {
  const userStore = useUserStore()
  const { $api } = useNuxtApp()
  const router = useRouter()

  const login = async (email: string, password: string) => {
    try {
      const response = await $api.post('/users/login', {
        email,
        password,
      })
      const token = response.data.access_token
      userStore.setToken(token)

      await fetchMe()
      router.push('/dashboard/teams')
    } catch (error: any) {
      console.error('Login error:', error)
      throw error.response?.data?.message || "Login error"
    }
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      await $api.post('/users', {
        name,
        email,
        password,
      })
      await login(email, password)
    } catch (error: any) {
      console.error('Register error:', error)
      throw error.response?.data?.message || "Register error"
    }
  }

  const fetchMe = async () => {
    try {
      const response = await $api.get('/users/me')
      userStore.setUser(response.data)
    } catch (error: any) {
      console.error('/me error:', error)
      userStore.logout();
      throw error.response?.data?.message || "Error fetching user data"
    }
  }

  const logout = () => {
    userStore.logout()
    router.push('/login')
  }

  const initAuth = async () => {
    userStore.loadFromStorage()
    if (userStore.token) {
      await fetchMe()
    }
  }
  return {
    login,
    register,
    logout,
    fetchMe,
    initAuth,
    user: computed(() => userStore.user),
    token: computed(() => userStore.token),
    isAuthenticated: computed(() => !!userStore.token)
  }
}