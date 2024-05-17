<!-- 3.55 -->

<script setup>
import { onMounted, reactive, ref, watch } from 'vue'
import axios from 'axios'
import TheHeader from './components/TheHeader.vue'
import CardList from './components/CardList.vue'
import TheDrawer from './components/TheDrawer.vue'

const items = ref([])

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

// функция для получения данных с закладочкой
const fetchFavorites = async () => {
  try {
    const { data } = await axios.get(`https://bd1bfdbaf3f110ab.mokky.dev/favorites`)
    items.value = data
  } catch (error) {
    console.error(error)
  }
}

// функция для получения данных
const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy
    }

    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`
    }

    const { data } = await axios.get(`https://bd1bfdbaf3f110ab.mokky.dev/items`, { params })
    items.value = data
  } catch (error) {
    console.error(error)
  }
}

onMounted(fetchItems)
watch(filters, fetchItems)
</script>

<template>
  <!-- <TheDrawer /> -->

  <div class="bg-white w-4/5 m-auto rounded-xl shadow-2xl mt-14">
    <TheHeader />

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

      <CardList :items="items" />
    </div>
  </div>
</template>
