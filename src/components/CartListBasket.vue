<script setup>
import CartItemBasket from './CartItemBasket.vue'
</script>

<template>
  <div class="flex flex-col gap-5">
    <CartItemBasket
      image-url="/sneakers/sneakers-1.jpg"
      title="Sneakers1"
      :price="100"
      :is-added="true"
      :is-favorite="true"
    />
    <CartItemBasket image-url="/sneakers/sneakers-2.jpg" title="Sneakers2" :price="50" />
    <CartItemBasket image-url="/sneakers/sneakers-3.jpg" title="Sneakers3" :price="70" />
  </div>
</template>
