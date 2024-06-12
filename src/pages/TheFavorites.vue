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
  <h2 class="text-3xl font-bold">All favorites</h2>
  <CardList :items="favorites" is-favorites @add-to-cart="onClickAddCartBasket" />
</template>
