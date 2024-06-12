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
    class="relative border-2 border-slate-200 rounded-3xl p-8 cursor-pointer transition hover:transform hover:scale-105 hover:shadow-xl hover:border-slate-200"
  >
    <img
      v-if="onClickFavotite"
      class="absolute w-10 top-5 left-5 border-2 border-slate-200 rounded-2xl hover:opacity-100 cursor-pointer transition hover:scale-110 active:scale-100"
      @click="onClickFavotite"
      :src="isFavorite ? ' /like-2.svg' : '/like-1.svg '"
      alt="like-1"
    />

    <img class="w-48 m-auto" :src="imageUrl" alt="sneakers-1" />

    <p class="mb-10 text-xl mt-2">{{ title }}</p>

    <div class="absolute bottom-5 left-5">
      <span class="text-slate-400 text-lg">Price: </span>
      <b class="text-xl">{{ price }} $</b>
    </div>

    <img
      class="absolute bottom-5 right-5 opacity-50 hover:opacity-100 w-10 cursor-pointer transition hover:scale-110 active:scale-100"
      @click="onClickAdd"
      :src="isAdded ? ' /checked.svg' : '/plus.svg '"
      alt="Added"
    />
  </div>
</template>
