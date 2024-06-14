<script setup>
import axios from 'axios'
import { inject, onMounted, ref } from 'vue'
import CardList from '@/components/CardList.vue'
import { cartBasket } from '@/cart'

const { onClickAddCartBasket } = inject('cart')

const favorites = ref([])

onMounted(async () => {
  try {
    const { data } = await axios.get(
      'https://bd1bfdbaf3f110ab.mokky.dev/favorites?_relations=items'
    )
    favorites.value = data.map((favorite) => favorite.item)

    favorites.value = favorites.value.map((item) => ({
      ...item,
      isAdded: cartBasket.value.some((cartItem) => cartItem.id === item.id)
    }))
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <div class="flex justify-between items-center mb-10">
    <h2 class="text-3xl font-bold">All favorites</h2>

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

  <CardList :items="favorites" is-favorites @add-to-cart="onClickAddCartBasket" />
</template>
