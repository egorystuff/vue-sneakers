<script setup>
import { computed } from 'vue'
import CartListBasket from './CartListBasket.vue'
import TheDrawerHead from './TheDrawerHead.vue'

const props = defineProps({
  totalPrice: Number,
  isCreatingOrder: Boolean
})

const emit = defineEmits(['createOrder'])

const buttonDisabled = computed(() => (props.isCreatingOrder.value ? true : false))
</script>

<template>
  <div class="fixed top-0 left-0 w-full h-full bg-black z-10 opacity-50"></div>
  <div class="fixed top-0 right-0 bg-white w-1/3 h-full z-20 p-8">
    <TheDrawerHead />

    <CartListBasket />

    <div class="flex flex-col gap-4 mt-10">
      <div class="flex gap-4">
        <span>Total:</span>
        <div class="flex-1 border-b-2 border-dashed"></div>
        <b>{{ totalPrice }} $</b>
      </div>

      <div class="flex gap-4">
        <span> Tax 5%:</span>
        <div class="flex-1 border-b-2 border-dashed"></div>
        <b>{{ Math.round(totalPrice * 0.05) }} $</b>
      </div>

      <button
        @click="emit('createOrder')"
        :disabled="totalPrice ? false : true"
        class="bg-lime-500 rounded-xl text-white w-full p-3 mt-5 disabled:bg-slate-300 opacity-70 hover:opacity-100 transition hover:scale-105 active:scale-100"
      >
        Checkout
      </button>
    </div>
  </div>
</template>
