<script setup>
import SneakerItem from '@/components/SneakerItem.vue'
import { fetchItems, items } from '@/items'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const sneakerId = ref(null)
const filterItems = ref()

onMounted(async () => {
  await fetchItems()
  sneakerId.value = Number(route.params.id)
  filterItems.value = items.value.filter((item) => item.id === sneakerId.value)
})
</script>

<template>
  <SneakerItem
    v-for="item in filterItems"
    :id="item.id"
    :key="item.id"
    :image-url="item.imageUrl"
    :title="item.title"
    :price="item.price"
    :is-added="item.isAdded"
    :is-favorite="item.isFavorite"
    :description="item.description"
    :material="item.material"
    :season="item.season"
    :color="item.color"
    :code="item.code"
  />

  <!-- <SneakerItem
    :id="filterItems[0].id"
    :image-url="filterItems[0].imageUrl"
    :title="filterItems[0].title"
  /> -->
  <p></p>
</template>
