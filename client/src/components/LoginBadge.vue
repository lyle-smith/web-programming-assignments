<script setup lang="ts">
import session, { login, logout, isLoggedIn } from "../stores/session";
</script>

<template>
  <div class="buttons" v-if="!isLoggedIn()">
    <a class="button is-danger">
      <strong>Sign up</strong>
    </a>
    <div class="navbar-item has-dropdown is-hoverable">
      <a class="button is-light"> Log in </a>

      <div class="navbar-dropdown">
        <a class="navbar-item" @click="login('Lyle', 'Smith', true)">Lyle Smith</a>
        <a class="navbar-item" @click="login('Michael', 'Jordan', false)"
          >Michael Jordan</a
        >
        <a class="navbar-item" @click="login('Bill', 'Gates', false)">Bill Gates</a>
      </div>
    </div>
  </div>
  <div v-else>
    <a class="navbar-item" @click="logout()">
      {{ session.user?.firstName }} {{ session.user?.lastName }}
    </a>
    <!-- (<a @click="logout()">logout</a>) -->
  </div>
</template>

<style scoped></style>
