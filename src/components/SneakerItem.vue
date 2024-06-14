<script setup>
const props = defineProps({
  id: Number,
  imageUrl: String,
  title: String,
  price: Number,
  isAdded: Boolean,
  isFavorite: Boolean
})
</script>

<template>
  <div class="w-3/4 m-auto relative border-2 border-slate-200 rounded-3xl p-8">
    <div @click="closeDrawer" class="flex items-center gap-4 mb-8">
      <img
        class="flex w-5 opacity-50 cursor-pointer rotate-180 transition hover:opacity-100 hover:scale-110 active:scale-100"
        src="/arrow-next.svg"
        alt="arrow"
      />
      <img
        class="flex w-10 top-5 left-5 border-2 border-slate-200 rounded-2xl hover:opacity-100 cursor-pointer transition hover:scale-110 active:scale-100"
        @click="onClickFavotite"
        :src="isFavorite ? ' /like-2.svg' : '/like-1.svg '"
        alt="like-1"
      />

      <h2 class="text-2xl font-bold"></h2>
    </div>

    <img class="w-96 m-auto" :src="props.imageUrl" alt="sneakers-1" />

    <p class="mb-10 text-xl mt-2">{{ title }}</p>

    <p class="mb-10 text-lg mt-2">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores mollitia ea nesciunt
      quis! Dignissimos, incidunt aliquid. Accusantium repellat veniam, provident dolor, architecto
      libero maxime aspernatur voluptatibus fugit aliquam iste. Deleniti. libero maxime aspernatur
      voluptatibus fugit aliquam iste. Deleniti. libero maxime aspernatur voluptatibus fugit aliquam
      iste. Deleniti. libero maxime aspernatur voluptatibus fugit aliquam iste. Deleniti. libero
      maxime aspernatur voluptatibus fugit aliquam iste. Deleniti. libero maxime aspernatur
      voluptatibus fugit aliquam iste. Deleniti. libero maxime aspernatur voluptatibus fugit aliquam
      iste. Deleniti.
    </p>

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
