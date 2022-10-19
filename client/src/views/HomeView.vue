<script setup lang="ts">
</script>

<template>
  <main class="container-fluid columns is-centered is-vcentered">
    <div class="column is-6">
      <h2 class="title is-1 secondary"><span class="has-text-danger">WORKOUT</span> TIME</h2>
      <h3 class="subtitle is-3 secondary">SPECIAL CLASSES</h3>
      <button class="button is-rounded px-6 mr-3 is-danger">Explore</button>
      <button class="button is-rounded px-6">Read More</button>
    </div>
  </main>
</template>

<style scoped>
main {
  background-image: url(../assets/landing-background.jpg);
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  min-height: 100vh;
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
