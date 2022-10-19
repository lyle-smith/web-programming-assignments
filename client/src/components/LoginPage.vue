<script setup lang="ts">
import session, { login } from "../stores/session";
</script>

<template>
  <div class="buttons" v-if="session.user == null">
    <a class="button is-danger">
      <strong>Sign up</strong>
    </a>
    <a class="button is-light"> Log in </a>
  </div>
  <div v-else>
    Welcome {{ session.user.firstName }} {{ session.user.lastName }}!
  </div>
</template>

<style scoped></style>
