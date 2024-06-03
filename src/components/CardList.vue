<script setup>
import CardItem from './CardItem.vue'

defineProps({
  items: Array
})

const emit = defineEmits(['addToFavorite', 'addToCart'])
</script>

<template>
  <div class="grid grid-cols-4 gap-4">
    <CardItem
      v-for="item in items"
      :id="item.id"
      :key="item.id"
      :image-url="item.imageUrl"
      :title="item.title"
      :price="item.price"
      :is-added="item.isAdded"
      :is-favorite="item.isFavorite"
      :on-click-favotite="() => emit('addToFavorite', item)"
      :on-click-add="() => emit('addToCart', item)"
    />
  </div>
</template>
