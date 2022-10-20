<template>
  <main v-if="isAdmin()">
    <div>Admin Screen</div>
  </main>
  <main v-else>
    <div>Can not access this page. Please log in.</div>
  </main>
</template>

<script setup lang="ts">
import { isAdmin } from "../stores/session";
</script>

<style scoped></style>
