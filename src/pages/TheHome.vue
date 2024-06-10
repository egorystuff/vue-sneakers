<script setup>
import CardList from '../components/CardList.vue'
import axios from 'axios'
import { inject, onMounted, reactive, ref, watch } from 'vue'

// -----------------------------------------------------------------------------------------------

const { addToCartBasket, removeFromCartBasket, cartBasket } = inject('cart')

const items = ref([])

// -----------------------------------------------------------------------------------------------

const filters = reactive({
  sortBy: 'title',
  searchQuery: ''
})

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value
}

const onChangeSearchInput = (event) => {
  filters.searchQuery = event.target.value
}

const onClickAddCartBasket = (item) => {
  if (!item.isAdded) {
    addToCartBasket(item)
  } else {
    removeFromCartBasket(item)
  }
}

const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      item.isFavorite = true
      const obj = { item_id: item.id }
      const { data } = await axios.post(`https://bd1bfdbaf3f110ab.mokky.dev/favorites`, obj)
      item.favoriteId = data.id
    } else {
      item.isFavorite = false
      await axios.delete(`https://bd1bfdbaf3f110ab.mokky.dev/favorites/${item.favoriteId}`)
      item.favoriteId = null
    }
  } catch (error) {
    console.error(error)
  }
}

// -----------------------------------------------------------------------------------------------
// функция для получения данных с закладочкой
const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get(`https://bd1bfdbaf3f110ab.mokky.dev/favorites`)
    items.value = items.value.map((item) => {
      const favorite = favorites.find((favorite) => favorite.item_id === item.id)

      if (!favorite) return item

      return { ...item, isFavorite: true, favoriteId: favorite.id }
    })
  } catch (error) {
    console.error(error)
  }
}

// функция для получения данных
const fetchItems = async () => {
  try {
    const params = { sortBy: filters.sortBy }
    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`
    }

    const { data } = await axios.get(`https://bd1bfdbaf3f110ab.mokky.dev/items`, { params })
    items.value = data.map((item) => ({
      ...item,
      isFavorite: false,
      favoriteId: null,
      isAdded: false
    }))
  } catch (error) {
    console.error(error)
  }
}

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
