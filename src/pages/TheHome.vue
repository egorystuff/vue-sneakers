<script setup>
import { inject, onMounted, watch } from 'vue'
import { fetchFavorites, fetchItems, filters, items } from '@/items'
import CardList from '../components/CardList.vue'

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
  <div class="flex justify-between items-center mb-10">
    <h2 class="text-3xl font-bold">All sneakers</h2>

    <div class="flex gap-4">
      <select
        @change="onChangeSelect"
        class="border-2 border-slate-300 py-2 px-4 rounded-xl outline-none"
      >
        <option value="name">By name</option>
        <option value="price">By price (cheap)</option>
        <option value="-price">By price (expensive)</option>
        <option value="rating">By rating</option>
      </select>

      <div class="relative">
        <img class="absolute left-6 top-3" src="/search.svg" alt="search" />
        <input
          @input="onChangeSearchInput"
          class="border-2 border-slate-300 rounded-xl pr-4 pl-12 py-2 outline-none focus:border-slate-400"
          type="text"
          placeholder="Search..."
        />
      </div>
    </div>
  </div>

  <CardList :items="items" @add-to-favorite="addToFavorite" @add-to-cart="onClickAddCartBasket" />
</template>
