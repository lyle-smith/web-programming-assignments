<template>
  <!-- <div class="bubble px-4 py-3 workout-item" v-if="false">
    <p class="pl-5 pb-3">
      <span class="pl-6 pr-5">Bodybuilding Workout</span> Day 1
    </p>
    <div class="columns">
      <div class="column is-3">
        <p>Exercise</p>
        <p>Exercise</p>
        <p>Exercise</p>
        <p>Exercise</p>
        <p>Exercise</p>
        <p class="has-text-centered">+</p>
      </div>
      <div class="column is-9">
        <div class="columns">
          <div class="column is-3">
            <p>Weight</p>
            <button class="button is-outlined is-white"></button>
          </div>
          <div class="column is-3">
            <p>Sets</p>
            <button class="button is-outlined is-white"></button>
          </div>
          <div class="column is-3">
            <p>Reps</p>
            <button class="button is-outlined is-white"></button>
          </div>
          <div class="column is-3">
            <p>RPE</p>
            <button class="button is-outlined is-white"></button>
          </div>
        </div>
      </div>
    </div>
  </div> -->
  <div class="my-3 workout-session">
    <p>Bodybuilding Workout</p> 
    <p>Day 1</p>
    <p>Exercise</p>
    <div class="workout-body pt-2">
      <div class="">
        <div class="">
          <div class="">
            <p>Weight</p>
            <button class="button is-outlined is-white"></button>
          </div>
          <div class="">
            <p>Sets</p>
            <button class="button is-outlined is-white"></button>
          </div>
          <div class="">
            <p>Reps</p>
            <button class="button is-outlined is-white"></button>
          </div>
          <div class="">
            <p>RPE</p>
            <button class="button is-outlined is-white"></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
p {
  text-align: center;
}

button {
  width: 100%;
  height: 1em;
}

.workout-session {
  background-color: #791a12;
  border-radius: 1em;
}

.workout-body {
  display: flex;
}

.bubble {
  border-radius: 1em;
  width: fit-content;
  color: white;
  background-color: #791a12;
}
</style>
