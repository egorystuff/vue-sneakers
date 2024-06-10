<script setup>
defineProps({
  id: Number,
  imageUrl: String,
  title: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  onClickFavotite: Function,
  onClickAdd: Function
})
</script>

<template>
  <div
    class="relative bg-white border-2 border-slate-100 rounded-3xl p-8 cursor-pointer transition hover:transform hover:scale-105 hover:shadow-xl hover:border-slate-200"
  >
    <img
      v-if="onClickFavotite"
      class="absolute top-5 left-5"
      @click="onClickFavotite"
      :src="isFavorite ? ' /like-2.svg' : '/like-1.svg '"
      alt="like-1"
    />

    <img class="w-3/4" :src="imageUrl" alt="sneakers-1" />

    <p class="mt-2">{{ title }}</p>

    <div class="flex justify-between mt-5">
      <div class="flex flex-col">
        <span class="text-slate-400">Price:</span>
        <b>{{ price }} $</b>
      </div>

      <img @click="onClickAdd" :src="isAdded ? ' /checked.svg' : '/plus.svg '" alt="Added" />
    </div>
  </div>
</template>
