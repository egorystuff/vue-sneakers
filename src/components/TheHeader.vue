<script setup>
const emit = defineEmits(['openDrawer'])

defineProps({
  totalPrice: Number
})
</script>

<template>
  <header class="flex justify-between border-b-2 border-slate-300 p-8">
    <RouterLink to="/">
      <div class="flex items-center gap-4">
        <img class="w-10" src="/logo.png" alt="Logo" />
        <div>
          <h2 class="text-xl font-bold uppercase">Vue Sneakers</h2>
          <p class="text-slate-500">This is the best sneaker store</p>
        </div>
      </div>
    </RouterLink>

    <ul class="flex items-center gap-10">
      <li
        @click="emit('openDrawer')"
        class="flex items-center gap-2 cursor-pointer text-slate-500 hover:text-black"
      >
        <img src="/cart.svg" alt="basket" />
        <span>{{ totalPrice }} $</span>
      </li>

      <RouterLink to="/favorites">
        <li class="flex items-center gap-2 cursor-pointer text-slate-500 hover:text-black">
          <img src="/heart.svg" alt="favorites" />
          <span>Favorites</span>
        </li>
      </RouterLink>

      <li class="flex items-center gap-2 cursor-pointer text-slate-500 hover:text-black">
        <img src="/profile.svg" alt="profile" />
        <span>Profile</span>
      </li>
    </ul>
  </header>
</template>
