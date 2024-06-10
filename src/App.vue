<!-- 7.02 -->

<script setup>
import { computed, provide, ref, watch } from 'vue'
import axios from 'axios'
import TheHeader from './components/TheHeader.vue'
import TheDrawer from './components/TheDrawer.vue'

// -----------------------------------------------------------------------------------------------

const drawerOpen = ref(false)
const cartBasket = ref([])
const isCreatingOrder = ref(false)
const totalPrice = computed(() => cartBasket.value.reduce((acc, item) => acc + item.price, 0))
const cartIsEmpty = computed(() => cartBasket.value.length === 0)
const cartButtonDisabled = computed(() => isCreatingOrder.value || cartIsEmpty.value)

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

// -----------------------------------------------------------------------------------------------
// функция для создания заказа
const createOrder = async () => {
  isCreatingOrder.value = true
  try {
    const { data } = await axios.post(`https://bd1bfdbaf3f110ab.mokky.dev/orders`, {
      items: cartBasket.value,
      totalPrice: totalPrice.value
    })
    cartBasket.value = []

    return data
  } catch (error) {
    console.error(error)
  } finally {
    isCreatingOrder.value = false
  }
}

// -----------------------------------------------------------------------------------------------

watch(
  cartBasket,
  () => {
    localStorage.setItem('cart', JSON.stringify(cartBasket.value))
  },
  { deep: true }
)

provide('cart', { cartBasket, closeDrawer, openDrawer, addToCartBasket, removeFromCartBasket })
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
      <TheDrawer
        v-if="drawerOpen"
        :total-price="totalPrice"
        :disabled-button="cartButtonDisabled"
        @create-order="createOrder"
      />
    </Transition>

    <div class="p-10">
      <!-- <TheHome /> -->
      <RouterView />
    </div>
  </div>
</template>
