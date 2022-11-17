<template>
  <main :id="loggedInDisplay" v-if="isLoggedIn()">
    <div class="container-fluid">
      <div class="columns mb-5">
        <div class="column">
          <h1 class="title has-text-light" id="header">
            <b>Workout</b><br /><span id="activity-word">Activity</span>
          </h1>
        </div>
        <div class="column">
          <div class="bubble" id="personal-record">
            <p class="mb-2"><b class="is-size-4">Personal Record</b></p>
            <div class="columns">
              <div class="record-col">
                <p class="has-text-weight-semibold">Squat</p>
                <p>5 lb</p>
              </div>
              <div class="record-col">
                <p class="has-text-weight-semibold">Bench</p>
                <p>5 lb</p>
              </div>
              <div class="record-col">
                <p class="has-text-weight-semibold">Deadlift</p>
                <p>5 lb</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column is-1">
          <div class="bubble" id="calendar">
            <span class="icon"><i class="fa fa-calendar is-size-1"></i></span>
          </div>
        </div>
        <div class="column is-8">
          <div class="setup-workout">
            <div class="bubble"><p>Add Workout</p></div>
            <div class="bubble">
              <p>
                Training Type:
                <span class="ml-5" id="training-type">Bodybuilding</span>
              </p>
            </div>
            <div class="bubble"><p>Exercise Quantity: 1</p></div>
            <button id="add-workout-submit" class="bubble mb-5">
              <p>Done</p>
            </button>
            <div class="bubble has-text-centered" id="date-select">
              <a href="">S</a> / <a href="">M</a> / <a href="">T</a> /
              <a href="">W</a> / <a href="">T</a> / <a href="">F</a> /
              <a href="">S</a>
            </div>
            <WorkoutSession />
          </div>
        </div>
        <div class="column is-3">
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
import { ref } from "vue";

const loggedInDisplay = ref("");

if (isLoggedIn()) {
  loggedInDisplay.value = "loggedInDisplay";
} else {
  loggedInDisplay.value = "";
}
</script>

<style scoped>
#loggedInDisplay {
  background-image: url(../assets/start-workout-background.png);
  background-position: left bottom;
  background-repeat: no-repeat;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: 100% 100%;
  padding-bottom: 5rem;
}

a {
  color: white;
  text-decoration: none;
}

h1 {
  font-size: 5.5rem;
}

p {
  font-size: 2rem;
}

.container-fluid {
  margin: 0 2rem 0 8rem;
}

#header {
  line-height: 1.3em;
  margin-top: 3rem;
}

.bubble {
  border-radius: 2rem;
  width: fit-content;
  color: white;
  background-color: #791a12;
}

#activity-word {
  margin-left: 7.5rem;
}

#personal-record {
  margin-top: 5em;
  margin-left: 6em;
  padding: 0.5rem 5rem 6rem 5rem;
  text-align: center;
}

#calendar {
  padding: 1.2em 1.7em;
  text-align: center;
  margin-left: 7rem;
}

.record-col {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.8em;
  padding-right: 0.7em;
  padding-left: 0.7em;
  border-right: 2px solid white;
}

.record-col:last-child {
  border-right: none;
}

.setup-workout {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-height: 16em;
  color: white;
}

.setup-workout .bubble {
  border-radius: 1.8rem;
  width: fit-content;
  padding: 1em 3em;
  margin-bottom: 0.6rem;
}

.setup-workout .bubble:first-child {
  margin-bottom: 1rem;
}

.setup-workout .bubble:first-child {
  padding: 1em 5em;
}

#training-type {
  border: 2px solid white;
  border-radius: 1em;
  padding: 0.4em 0.7em;
}

#add-workout-submit p {
  font-size: 1.3rem;
}

#date-select {
  padding: 1rem 2rem;
  border-radius: 2em;
  font-size: 2rem;
}

#date-select a {
  padding: 0 1rem;
}

#energy-bar {
  display: flex;
  align-items: flex-end;
  justify-content: center;
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

.bar {
  width: 1rem;
  margin: 0.8rem 0.15rem;
  border-radius: 0.2rem;
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
  width: 16rem;
  height: 16rem;
  background-image: url(../assets/RPE-scale.webp);
  background-position: center center;
  background-repeat: no-repeat;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: 100% 100%;
}
</style>
