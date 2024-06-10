<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import CardList from '@/components/CardList.vue'

const favorites = ref([])

onMounted(async () => {
  try {
    const { data } = await axios.get(
      'https://bd1bfdbaf3f110ab.mokky.dev/favorites?_relations=items'
    )
    favorites.value = data.map((favorite) => favorite.item)
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <h1>The favorites</h1>
  <CardList :items="favorites" is-favorites />
</template>
