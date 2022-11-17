<script setup lang="ts">
import { RouterView } from "vue-router";
import NavVue from "./components/NavBar.vue";
</script>

<template>
  <header>
    <NavVue />
  </header>

  <div>
    <RouterView />
  </div>
</template>

<style scoped></style>
