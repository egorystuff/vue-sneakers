<script setup>
import { provide, watch } from 'vue'
import TheHeader from './components/TheHeader.vue'
import TheDrawer from './components/TheDrawer.vue'
import {
  cartBasket,
  totalPrice,
  openDrawer,
  closeDrawer,
  onClickAddCartBasket,
  addToFavorite,
  drawerOpen
} from './cart'

watch(
  cartBasket,
  () => {
    localStorage.setItem('cart', JSON.stringify(cartBasket.value))
  },
  { deep: true }
)

provide('cart', { cartBasket, closeDrawer, openDrawer, onClickAddCartBasket, addToFavorite })

// -----------------------------------------------------------------------------------------------
</script>

<template>
  <div class="bg-white w-4/5 m-auto rounded-xl shadow-2xl mt-14">
    <TheHeader :total-price="totalPrice" @open-drawer="openDrawer" />

    <Transition
      appear
      enter-active-class="ease-out duration-300"
      enter-from-class="opacity-0"
      enter-to-class=" opacity-100"
      leave-active-class="ease-in duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <TheDrawer v-if="drawerOpen" :total-price="totalPrice" />
    </Transition>

    <div class="p-10">
      <RouterView />
    </div>
  </div>
</template>
