<script setup lang="ts">
import router from "@/router";
</script>

<template>
  <main class="columns is-centered is-vcentered is-mobile">
    <div class="column is-half">
      <h2 class="title is-1 secondary">
        <span class="has-text-danger">WORKOUT</span> TIME
      </h2>
      <h3 class="subtitle is-3 secondary">SPECIAL CLASSES</h3>
      <button
        class="button is-rounded px-6 mr-3 is-danger"
        @click="router.push('/start-workout')"
      >
        Let's Workout!
      </button>
      <button class="button is-rounded px-6">Read More</button>
    </div>
  </main>
</template>

<style scoped>
main {
  background-image: url(../assets/landing-background.jpg);
  background-position: center center;
  background-repeat: no-repeat;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: 100% 100%;
  min-height: 120vh;
  color: white;
}

.primary {
  color: #e40215;
}
.primary-background {
  background-color: #e40215;
}

.secondary {
  color: #f5f5f5;
}
</style>
