<template>
  <div class="min-h-screen flex items-center justify-center layout neutral-content">
    <div class="w-full max-w-md p-8 space-y-6 rounded-lg shadow-lg container">
      <h1 class="text-3xl font-bold text-center">Login</h1>
      <form @submit.prevent="onLogin" class="space-y-4">

          <label class="input validator w-full">
            <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor">
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </g>
            </svg>
            <input v-model="email" type="email" placeholder="mail@site.com" required autocomplete="email"/>
          </label>
          <div class="validator-hint hidden">Enter valid email address</div>
          <label class="input validator w-full">
            <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g
                stroke-linejoin="round"
                stroke-linecap="round"
                stroke-width="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                ></path>
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
              </g>
            </svg>
            <input
              v-model="password"
              type="password"
              required
              placeholder="Password"
              minlength="6"
              title="Must be more than 6 characters"
            />
          </label>
          <p class="validator-hint hidden">
            Must be more than 8 characters
          </p>
        <button class="btn btn-primary w-full" :disabled="loading" type="submit">
          <span v-if="loading" class="loading loading-spinner"></span>
          Login
        </button>
        <div v-if="error" class="alert alert-error mt-2 py-2 px-4">
          {{ error }}
        </div>
      </form>
      <div class="text-center ">
        <NuxtLink to="/register" class="underline">
          Dont have an account? Register
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'

const email = ref('')
const password = ref('')
const loading = ref(false)

const error = ref('')

const { login } = useAuth()

const onLogin = async () => {
  loading.value = true
  error.value = ''
  try {
    await login(email.value, password.value)
  } catch (err: any) {
    error.value = err
  } finally {
    loading.value = false
  }
}
</script>
