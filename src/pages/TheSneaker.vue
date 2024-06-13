<script setup>
import CardList from '@/components/CardList.vue'
import { fetchItems, items } from '@/items'
import axios from 'axios'
import { onMounted, ref } from 'vue'

const sneaker = ref([])
const sneakerId = 4
const filterItems = ref([])

const fetchSneaker = async () => {
  try {
    const { data } = await axios.get(`https://bd1bfdbaf3f110ab.mokky.dev/items?id=10`)

    sneaker.value = data
  } catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  await fetchSneaker()
  await fetchItems()
  filterItems.value = items.value.filter((item) => item.id === sneakerId)

  console.log(items)
})
</script>

<template>
  <!-- <div
    class="relative border-2 border-slate-200 rounded-3xl p-8 cursor-pointer transition hover:transform hover:scale-105 hover:shadow-xl hover:border-slate-200"
  >
    <img class="w-48 m-auto" :src="imageUrl" alt="sneakers-1" />

    <p class="mb-10 text-xl mt-2">{{}}</p>

    <div class="absolute bottom-5 left-5">
      <span class="text-slate-400 text-lg">Price: </span>
      <b class="text-xl">{{ price }} $</b>
    </div>

    <img
      class="absolute bottom-5 right-5 opacity-50 hover:opacity-100 w-10 cursor-pointer transition hover:scale-110 active:scale-100"
      @click="onClickAdd"
      :src="isAdded ? ' /checked.svg' : '/plus.svg '"
      alt="Added"
    />
  </div> -->

  <CardList :items="filterItems" />
</template>
