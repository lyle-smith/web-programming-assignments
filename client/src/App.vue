<script setup lang="ts">
import { RouterView } from "vue-router";
import NavVue from "./components/NavBar.vue";
import MessageListView from "./views/MessageListView.vue";
</script>

<template>
  <header>
    <NavVue />
    <MessageListView />
  </header>

  <div>
    <RouterView />
  </div>
</template>

<style scoped></style>
