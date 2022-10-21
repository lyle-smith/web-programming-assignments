<template>
  <main v-if="isLoggedIn()" class="has-background-danger">
    <div>Social Page</div>
  </main>
  <main v-else>
    <LoginView />
  </main>
</template>

<script setup lang="ts">
import { isLoggedIn } from "../stores/session";
import LoginView from "./LoginView.vue";
</script>

<style scoped>

</style>
