<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import NavVue from "./components/Nav.vue";
</script>

<template>
  <header>
    <NavVue />
  </header>

  <div class="container-fluid">
    <RouterView />
  </div>
</template>

<style scoped></style>