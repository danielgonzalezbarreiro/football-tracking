import axios from 'axios'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const api = axios.create({
    baseURL: config.public.apiUrl as string,
  })

  api.interceptors.request.use((request) => {
    const token = localStorage.getItem('token')
    if (token) {
      request.headers.Authorization = `Bearer ${token}`
    }
    return request
  })

  api.interceptors.response.use(
    response => response,
    error => {
      if (error.response && error.response.status === 401) {
      }
      return Promise.reject(error)
    }
  )

  nuxtApp.provide('api', api)
})