<script setup>
defineProps({
  imageUrl: String,
  title: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  onClickAdd: Function,
  onClickFavotite: Function
})
</script>

<template>
  <div class="flex relative items-center bg-white border-2 border-slate-100 rounded-xl p-5 gap-5">
    <img class="w-20" src="/sneakers/sneakers-1.jpg" alt="sneakers-1" />
    <div class="flex flex-col">
      <p>{{ title }}</p>
      <div class="flex justify-between mt-2">
        <b>{{ price }} $</b>
        <img
          class="absolute bottom-5 right-5 opacity-50 hover:opacity-100 cursor-pointer transition hover:scale-110 active:scale-100"
          src="/close.svg"
          alt=""
        />
      </div>
    </div>
  </div>
</template>
