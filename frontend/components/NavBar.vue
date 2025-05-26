<template>
  <nav class="bg-gray-800 text-white px-4 py-2 flex items-center justify-between">
    <div class="flex items-center">
      <button @click="toggleMenu" class="md:hidden mr-2">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <span class="font-bold">Football Tracker</span>
    </div>

    <div class="hidden md:flex items-center space-x-4">
      <span v-if="user">{{ user.name }} ({{ user.email }})</span>
      <NuxtLink to="/dashboard/teams" class="hover:underline">Teams</NuxtLink>

      <button
        v-if="user"
        @click="logout"
        class="btn btn-error text-error-content"
      >
        Logout
      </button>
      <NuxtLink
        v-else
        to="/login"
        class="btn btn-primary text-success-content"
      >
        Login
      </NuxtLink>
    </div>

    <div v-if="menuOpen" class="absolute top-14 left-0 w-full bg-gray-800 flex flex-col md:hidden z-50">
      <NuxtLink to="/dashboard/teams" class="p-4 border-b border-gray-700" @click="closeMenu">Teams</NuxtLink>

      <button
        v-if="user"
        @click="() => { logout(); closeMenu() }"
        class="btn btn-error text-error-content m-2"
      >
        Logout
      </button>
      <NuxtLink
        v-else
        to="/login"
        class="btn btn-primary text-success-content m-2"
        @click="closeMenu"
      >
        Login
      </NuxtLink>

      <div class="p-4 border-t border-gray-700 flex flex-col gap-2" v-if="user">
        <div class="flex items-center gap-2 mb-1">
          <svg class="h-5 w-5 text-neutral-content opacity-70" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </g>
          </svg>
          <span class="text-sm text-neutral-content">{{ user.name }}</span>
        </div>

        <div class="flex items-center gap-2">
          <svg class="h-5 w-5 text-neutral-content opacity-70" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor">
              <rect width="20" height="16" x="2" y="4" rx="2"></rect>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
            </g>
          </svg>
          <span class="text-sm text-neutral-content">{{ user.email }}</span>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'

const menuOpen = ref(false)
const { user, logout } = useAuth()

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}
function closeMenu() {
  menuOpen.value = false
}
</script>
