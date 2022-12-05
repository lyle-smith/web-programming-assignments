<script setup lang="ts">
import session, { login, logout, isLoggedIn } from "../stores/session";
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="buttons" v-if="!isLoggedIn()">
    <router-link to="sign-up" class="button is-danger">
      <strong>Sign up</strong>
    </router-link>
    <div class="navbar-item has-dropdown is-hoverable">
      <router-link to="/login" class="button is-light">Log in</router-link>
      <div class="navbar-dropdown">
        <a class="navbar-item" @click="login('lylesmith123')">Lyle Smith</a>
        <a class="navbar-item" @click="login('mjordan01')">Michael Jordan</a>
        <a class="navbar-item" @click="login('windows4life')">Bill Gates</a>
      </div>
    </div>
  </div>
  <div v-else>
    <a class="navbar-item" @click="logout()">
      {{ session.user?.userName }}
    </a>
  </div>
</template>

<style scoped></style>
