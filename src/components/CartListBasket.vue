<script setup>
import { inject } from 'vue'
import CartItemBasket from './CartItemBasket.vue'

const { cartBasket, removeFromCartBasket } = inject('cart')
</script>

<template>
  <div class="flex flex-col gap-5">
    <CartItemBasket
      v-for="item in cartBasket"
      :key="item.id"
      :title="item.title"
      :price="item.price"
      :image-url="item.imageUrl"
      @on-click-remove="() => removeFromCartBasket(item)"
    />
  </div>
</template>
