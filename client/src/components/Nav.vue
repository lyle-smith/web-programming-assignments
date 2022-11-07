<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";
import LoginBadge from "./LoginBadge.vue";
import { isAdmin } from "../stores/session";

let isActive = ref(false);
</script>
<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <router-link
          id="logo"
          class="navbar-item has-text-weight-semibold"
          to="/"
          ><span class="has-text-danger">SPE</span>CIAL</router-link
        >

        <a
          :class="{ 'is-active': isActive }"
          @click="isActive = !isActive"
          role="button"
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        id="navbarBasicExample"
        class="navbar-menu"
        :class="{ 'is-active': isActive }"
      >
        <div class="navbar-end">
          <router-link to="/admin" class="navbar-item" v-if="isAdmin()"
            >Admin</router-link
          >
          <router-link to="/" class="navbar-item">Home</router-link>
          <router-link to="/start-workout" class="navbar-item"
            >Start Workout</router-link
          >
          <router-link to="/my-workouts" class="navbar-item"
            >My Workouts</router-link
          >
          <router-link to="/social" class="navbar-item">Social</router-link>
          <router-link to="/about" class="navbar-item">About</router-link>
          <div class="navbar-item">
            <LoginBadge />
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style>
.router-link-active {
  border-bottom: #df0a0a 2px solid;
}

.navbar-brand #logo {
  border-bottom: none;
  text-decoration: none;
  color: inherit;
}

.primary {
  color: #df0a0a;
}

nav {
  height: 7vh;
  padding-bottom: 4em;
}
</style>
