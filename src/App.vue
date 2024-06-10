<!-- 7.19 -->

<script setup>
import { computed, provide, ref, watch } from 'vue'
import axios from 'axios'
import TheHeader from './components/TheHeader.vue'
import TheDrawer from './components/TheDrawer.vue'

// -----------------------------------------------------------------------------------------------

const drawerOpen = ref(false)
const cartBasket = ref([])
const totalPrice = computed(() => cartBasket.value.reduce((acc, item) => acc + item.price, 0))

// -----------------------------------------------------------------------------------------------

const closeDrawer = () => {
  drawerOpen.value = false
}

const openDrawer = () => {
  drawerOpen.value = true
}

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
// функция для создания заказа

// -----------------------------------------------------------------------------------------------

watch(
  cartBasket,
  () => {
    localStorage.setItem('cart', JSON.stringify(cartBasket.value))
  },
  { deep: true }
)

// -----------------------------------------------------------------------------------------------

provide('cart', { cartBasket, closeDrawer, openDrawer, onClickAddCartBasket, addToFavorite })
</script>

<template>
  <div class="bg-white w-4/5 m-auto rounded-xl shadow-2xl mt-14">
    <TheHeader :total-price="totalPrice" @open-drawer="openDrawer" />

    <Transition
      appear
      enter-active-class="ease-out duration-300"
      enter-from-class="opacity-0 "
      enter-to-class=" opacity-100 "
      leave-active-class="ease-in duration-200"
      leave-from-class="opacity-100 "
      leave-to-class="opacity-0 "
    >
      <TheDrawer v-if="drawerOpen" :total-price="totalPrice" />
    </Transition>

    <div class="p-10">
      <RouterView />
    </div>
  </div>
</template>
