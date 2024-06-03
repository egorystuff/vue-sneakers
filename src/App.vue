<!-- 5.19 -->

<script setup>
import { onMounted, provide, reactive, ref, watch } from 'vue'
import axios from 'axios'
import TheHeader from './components/TheHeader.vue'
import CardList from './components/CardList.vue'
import TheDrawer from './components/TheDrawer.vue'

// -----------------------------------------------------------------------------------------------

const items = ref([])
const drawerOpen = ref(false)
const cartBasket = ref([])

const closeDrawer = () => {
  drawerOpen.value = false
}

const openDrawer = () => {
  drawerOpen.value = true
}

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
// -----------------------------------------------------------------------------------------------
// функция для получения данных с закладочкой
const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get(`https://bd1bfdbaf3f110ab.mokky.dev/favorites`)
    items.value = items.value.map((item) => {
      const favorite = favorites.find((favorite) => favorite.parentId === item.id)

      if (!favorite) return item

      return { ...item, isFavorite: true, favoriteId: favorite.id }
    })
  } catch (error) {
    console.error(error)
  }
}

// -----------------------------------------------------------------------------------------------

const addToCartBasket = (item) => {
  cartBasket.value.push(item)
  item.isAdded = true
}

const removeFromCartBasket = (item) => {
  cartBasket.value.splice(cartBasket.value.indexOf(item), 1)
  item.isAdded = false
}

const onClickAddCartBasket = (item) => {
  if (!item.isAdded) {
    addToCartBasket(item)
  } else {
    removeFromCartBasket(item)
  }
  console.log(cartBasket.value)
}

// -----------------------------------------------------------------------------------------------

const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      item.isFavorite = true
      const obj = { parentId: item.id }
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
  await fetchItems()
  await fetchFavorites()
})

watch(filters, fetchItems)

provide('cart', { cartBasket, closeDrawer, openDrawer, addToCartBasket, removeFromCartBasket })
</script>

<template>
  <TheDrawer v-if="drawerOpen" />

  <div class="bg-white w-4/5 m-auto rounded-xl shadow-2xl mt-14">
    <TheHeader @open-drawer="openDrawer" />

    <div class="p-10">
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

      <CardList
        :items="items"
        @add-to-favorite="addToFavorite"
        @add-to-cart="onClickAddCartBasket"
      />
    </div>
  </div>
</template>
