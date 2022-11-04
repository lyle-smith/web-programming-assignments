<template>
  <main v-if="isLoggedIn()">
    <div class="container">
      <h1 class="title is-2 has-text-black p-5"><b>Workout</b> Activity</h1>
      <div class="setup-workout">
        <div
          class="bubble has-text-centered has-background-danger"
          id="date-select"
        >
          <a href="">S</a> / <a href="">M</a> / <a href="">T</a> /
          <a href="">W</a> / <a href="">T</a> / <a href="">F</a> /
          <a href="">S</a>
        </div>
        <div class="bubble has-background-danger">Add Workout</div>
        <div class="bubble has-background-danger">
          Training Type: Bodybuilding
        </div>
        <div class="bubble has-background-danger">Exercise Quantity: 1</div>
      </div>
    </div>
    <div class="columns">
      <div class="column is-6">
        <div class="bubble has-background-danger px-4 py-3 current-workout">
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
                  <button class="button is-outlined"></button>
                </div>
                <div class="column is-3">
                  <p>Sets</p>
                  <button class="button is-outlined"></button>
                </div>
                <div class="column is-3">
                  <p>Reps</p>
                  <button class="button is-outlined"></button>
                </div>
                <div class="column is-3">
                  <p>RPE</p>
                  <button class="button is-outlined"></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  <main v-else>
    <LoginView />
  </main>
</template>

<script setup lang="ts">
import { isLoggedIn } from "../stores/session";
import LoginView from "./LoginView.vue";
</script>

<style scoped>
main {
  background-color: #272727;
}

a {
  color: white;
  text-decoration: none;
}

.current-workout button {
  width: 100%;
  height: 1em;
}

.setup-workout {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 3em;
  align-items: center;
  min-height: 16em;
  color: white;
}

.bubble {
  border-radius: 1em;
  width: fit-content;
  color: white;
}

.setup-workout .bubble {
  border-radius: 1em;
  width: fit-content;
  padding: 1em 3em;
}

#date-select {
  width: 60vw;
  border-radius: 2em;
}

#date-select a {
  padding: 0 1em;
}
</style>
