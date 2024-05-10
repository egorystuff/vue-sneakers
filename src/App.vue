<!-- 2:14 -->

<script setup>
import TheHeader from './components/TheHeader.vue'
import CardList from './components/CardList.vue'
</script>

<template>
  <div class="bg-white w-4/5 m-auto rounded-xl shadow-2xl mt-14">
    <TheHeader />

    <div class="p-10">
      <h2 class="text-3xl font-bold mb-10">All sneakers</h2>

      <CardList />
    </div>
  </div>
</template>
