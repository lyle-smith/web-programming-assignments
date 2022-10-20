<script setup lang="ts">
import { RouterView } from "vue-router";
import NavVue from "./components/Nav.vue";
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