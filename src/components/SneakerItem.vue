<script setup>
const props = defineProps({
  id: Number,
  imageUrl: String,
  title: String,
  price: Number,
  isAdded: Boolean,
  isFavorite: Boolean,
  description: String,
  material: String,
  season: String,
  color: String,
  code: String
})

// const categories = ['О товаре', 'О бренде', 'Отзывы', 'Вопросы']
const categories = [
  { name: 'О товаре', id: 1 },
  { name: 'О бренде', id: 2 },
  { name: 'Отзывы', id: 3 },
  { name: 'Вопросы', id: 4 }
]

const onClickCat = (event) => {
  console.log(event.target.value)
}
</script>

<template>
  <div class="w-3/4 m-auto relative border-2 border-slate-200 rounded-3xl p-8">
    <div @click="closeDrawer" class="flex items-center gap-4 mb-8">
      <RouterLink to="/">
        <img
          class="absolute w-5 opacity-50 cursor-pointer rotate-180 transition hover:opacity-100 hover:scale-110 active:scale-100"
          src="/arrow-next.svg"
          alt="arrow"
        />
      </RouterLink>

      <img
        class="absolute w-10 top-5 right-5 border-2 border-slate-200 rounded-2xl hover:opacity-100 cursor-pointer transition hover:scale-110 active:scale-100"
        @click="onClickFavotite"
        :src="isFavorite ? ' /like-2.svg' : '/like-1.svg '"
        alt="like-1"
      />
    </div>

    <p class="flex justify-between align-center mb-10 text-2xl mt-2">{{ title }}</p>

    <img class="w-96 m-auto" :src="props.imageUrl" alt="sneakers-1" />

    <p class="mb-10 text-lg mt-2 text-justify">
      {{ description }}
    </p>

    <ul class="flex gap-3 text-2xl font-bold mb-10">
      <li
        v-for="category in categories"
        :key="category.id"
        :value="category.id"
        @click="onClickCat"
        class="cursor-pointer text-slate-500 hover:text-black"
      >
        {{ category.name }}
      </li>
    </ul>

    <div class="border-2 p-5 border-slate-200 mb-10 rounded-xl">
      <p class="font-medium text-lg">Материал верха: {{ material }}</p>
      <p class="font-medium text-lg mt-2">Сезон: {{ season }}</p>
      <p class="font-medium text-lg mt-2">Цвет: {{ color }}</p>
      <p class="font-medium text-lg mt-2">Артикул: {{ code }}</p>
    </div>

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
