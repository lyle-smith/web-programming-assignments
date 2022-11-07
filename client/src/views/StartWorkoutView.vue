<template>
  <main v-if="isLoggedIn()">
    <div class="container">
      <h1 class="title is-2 p-5 has-text-light"><b>Workout</b> Activity</h1>
      <div class="setup-workout">
        <div class="bubble has-text-centered" id="date-select">
          <a href="">S</a> / <a href="">M</a> / <a href="">T</a> /
          <a href="">W</a> / <a href="">T</a> / <a href="">F</a> /
          <a href="">S</a>
        </div>
        <div class="bubble">Add Workout</div>
        <div class="bubble">Training Type: Bodybuilding</div>
        <div class="bubble">Exercise Quantity: 1</div>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <WorkoutSession />
      </div>
      <div class="column">
        <WorkoutSession />
      </div>
      <div class="column">
        <WorkoutSession />
      </div>
      <div class="column">
        <WorkoutSession />
      </div>
      <div class="column">
        <WorkoutSession />
      </div>
      <div class="column">
        <WorkoutSession />
      </div>
      <div class="column">
        <WorkoutSession />
      </div>
    </div>
    <div class="columns mt-6">
      <div class="column is-7">
        <div class="bubble" id="personal-record">
          <p class="mb-1"><b class="is-size-5">Personal Record</b></p>
          <div class="columns">
            <div class="column"><p>Squat</p></div>
            <div class="column"><p>Bench</p></div>
            <div class="column"><p>Deadlift</p></div>
          </div>
        </div>
      </div>
      <div class="column is-5">
        <div class="bubble mt-6">
          <p class="has-text-centered py-2"><b>Energy Meter</b></p>
          <div id="rpe"></div>
          <div id="energy-bar">
            <div id="one" class="bar red"></div>
            <div id="two" class="bar red"></div>
            <div id="three" class="bar red"></div>
            <div id="four" class="bar yellow"></div>
            <div id="five" class="bar yellow"></div>
            <div id="six" class="bar yellow"></div>
            <div id="seven" class="bar yellow"></div>
            <div id="eight" class="bar green"></div>
            <div id="nine" class="bar green"></div>
            <div id="ten" class="bar green"></div>
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
import WorkoutSession from "../components/WorkoutSession.vue";
</script>

<style scoped>
main {
  background-color: #1f1f1f;
  color: white;
}

a {
  color: white;
  text-decoration: none;
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
  background-color: #791a12;
}

.red {
  background-color: #ed3337;
}

.yellow {
  background-color: #fef212;
}

.green {
  background-color: #00a859;
}

.setup-workout .bubble {
  border-radius: 1em;
  width: fit-content;
  padding: 1em 3em;
}

.bar {
  width: 1em;
  margin: 0.8em 0.2em;
}

#date-select {
  width: 60vw;
  border-radius: 2em;
}

#date-select a {
  padding: 0 1em;
}

#energy-bar {
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

#personal-record {
  margin-top: 8em;
  margin-left: 6em;
  padding: 1em 4em 3em 2em;
}

#personal-record .column p {
  padding-right: 1.3em;
  border-right: 1px solid white;
}

#personal-record .column:last-child p {
  border-right: none;
}

#one {
  height: 1em;
}

#two {
  height: 1.5em;
}

#three {
  height: 2em;
}

#four {
  height: 2.5em;
}

#five {
  height: 3em;
}

#six {
  height: 3.5em;
}

#seven {
  height: 4em;
}

#eight {
  height: 4.5em;
}

#nine {
  height: 5em;
}

#ten {
  height: 5.5em;
}

#rpe {
  width: 18em;
  height: 18em;
  background-image: url(../assets/RPE-scale.webp);
  background-position: center center;
  background-repeat: no-repeat;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: 100% 100%;
}
</style>
