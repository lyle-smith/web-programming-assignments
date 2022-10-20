<script setup lang="ts">
import session, { login, logout } from "../stores/session";
</script>

<template>
  <div class="buttons" v-if="session.user == null">
    <a class="button is-danger">
      <strong>Sign up</strong>
    </a>
    <div class="navbar-item has-dropdown is-hoverable">
      <a class="button is-light"> Log in </a>

      <div class="navbar-dropdown">
        <a class="navbar-item" @click="login('Lyle', 'Smith')">Lyle Smith</a>
        <a class="navbar-item" @click="login('Michael', 'Jordan')">Michael Jordan</a>
        <a class="navbar-item" @click="login('Bill', 'Gates')">Bill Gates</a>
      </div>
    </div>
  </div>
  <div v-else>
    Welcome {{ session.user.firstName }} {{ session.user.lastName }}! (<a
      @click="logout()"
      >logout</a
    >)
  </div>
</template>

<style scoped></style>
