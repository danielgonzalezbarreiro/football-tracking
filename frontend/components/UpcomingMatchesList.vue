<template>
  <div v-if="matches.length">
    <h2 class="text-xl font-semibold mb-4">Next Matches</h2>
    <ul class="space-y-2">
      <li v-for="match in matches" :key="match.fixture.id" class="border rounded p-2 flex flex-col md:flex-row md:items-center md:justify-between">
        <div class="flex items-center gap-2 justify-center">
          <img :src="match.teams.home.logo" alt="home logo" class="w-6 h-6" />
          <span>{{ match.teams.home.name }}</span>
          <span class="mx-2">vs</span>
          <img :src="match.teams.away.logo" alt="away logo" class="w-6 h-6" />
          <span>{{ match.teams.away.name }}</span>
        </div>
        <div class="text-gray-500 text-sm mt-1 md:mt-0">{{ new Date(match.fixture.date).toLocaleString() }}</div>
      </li>
    </ul>
  </div>
  <div v-else class="text-gray-500">There are no upcoming matches</div>
</template>

<script setup lang="ts">
defineProps<{ matches: any[] }>()
</script>