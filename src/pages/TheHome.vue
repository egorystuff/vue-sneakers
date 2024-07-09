<script setup>
import { inject, onMounted, watch } from 'vue'
import { fetchFavorites, fetchItems, filters, items } from '@/items'
import CardList from '../components/CardList.vue'
import NavigationBar from '@/components/NavigationBar.vue'

// -----------------------------------------------------------------------------------------------

const { onClickAddCartBasket, cartBasket, addToFavorite } = inject('cart')

// -----------------------------------------------------------------------------------------------

onMounted(async () => {
  cartBasket.value = JSON.parse(localStorage.getItem('cart') || '[]')

  await fetchItems()
  await fetchFavorites()

  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cartBasket.value.some((cartItem) => cartItem.id === item.id)
  }))
})

watch(cartBasket, () => {
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: false
  }))
})

watch(filters, fetchItems, () => {
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cartBasket.value.some((cartItem) => cartItem.id === item.id)
  }))
})
</script>

<template>
  <NavigationBar name="All Sneakers" />

  <CardList :items="items" @add-to-favorite="addToFavorite" @add-to-cart="onClickAddCartBasket" />
</template>
