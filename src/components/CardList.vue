<script setup>
import CardItem from './CardItem.vue'
</script>

<template>
  <div class="grid grid-cols-4 gap-5">
    <CardItem
      image-url="/sneakers/sneakers-1.jpg"
      title="Sneakers1"
      :price="100"
      :is-added="true"
      :is-favorite="true"
    />
    <CardItem image-url="/sneakers/sneakers-2.jpg" title="Sneakers2" :price="50" />
    <CardItem image-url="/sneakers/sneakers-3.jpg" title="Sneakers3" :price="70" />
  </div>
</template>
