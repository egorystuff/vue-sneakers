<script setup>
import { inject } from 'vue'

defineProps({
  imageUrl: String,
  title: String,
  description: String
})

const { closeDrawer } = inject('cart')
</script>

<template>
  <div class="flex flex-col items-center text-center">
    <img class="w-32 h-32" :src="imageUrl" alt="Info image" />
    <h2 class="mt-4 text-2xl font-medium">{{ title }}</h2>
    <p class="text-slate-500 text-xl">{{ description }}</p>
  </div>

  <button
    @click="closeDrawer"
    class="bg-lime-500 rounded-xl text-white w-full p-3 mt-10 disabled:bg-slate-300 opacity-70 hover:opacity-100 transition hover:scale-105 active:scale-100"
  >
    Go to home
  </button>
</template>
