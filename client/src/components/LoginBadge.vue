<script setup lang="ts">
import session, { login, logout, isLoggedIn } from "../stores/session";
import { RouterLink } from "vue-router";
import { computed, ref, watch } from "vue";

</script>

<template>
  <div class="buttons" v-if="!isLoggedIn()">
    <router-link to="sign-up" class="button is-danger">
      <strong>Sign up</strong>
    </router-link>
    <router-link to="/login" class="button is-light">Log in</router-link>
  </div>
  <div v-else>
    <div class="navbar-item has-dropdown is-hoverable">
      <a>{{ session.user?.userName }}</a>
      <div class="navbar-dropdown">
        <router-link to="/profile" class="navbar-item">Profile</router-link>
        <router-link to="/friends" class="navbar-item">Friends</router-link>
        <a class="navbar-item" @click="logout()">Log Out</a>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
