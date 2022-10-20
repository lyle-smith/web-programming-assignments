<!-- eslint-disable prettier/prettier -->
<script setup lang="ts">
  import { ref } from 'vue';
  import { RouterLink } from 'vue-router';
  import LoginBadge from './LoginBadge.vue';

  let isActive = ref(false);
</script>
<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <a class="navbar-item has-text-weight-semibold" href="https://bulma.io"
          ><span class="primary">SPE</span>CIAL</a
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
          <router-link to="/" class="navbar-item">Home</router-link>
          <router-link to="/my-workouts" class="navbar-item"
            >My Workouts</router-link
          >
          <router-link to="/social" class="navbar-item"
            >Social</router-link
          >
          <router-link to="/about" class="navbar-item">About</router-link>
          <div class="navbar-item">
            <div class="buttons">
              <LoginBadge />
            </div>
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
.primary {
  color: #df0a0a;
}
</style>
