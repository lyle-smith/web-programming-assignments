<script setup lang="ts">
import { isLoggedIn } from "../stores/session";
import LoginView from "./LoginView.vue";
import WorkoutSession from "../components/WorkoutSession.vue";
import { computed, ref } from "vue";

let date = ref(new Date());
const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function setDate(year: number, month: number, day: number) {
  date.value = new Date(year, month, day);
}

function incrementDate() {
  setDate(
    date.value.getFullYear(),
    date.value.getMonth(),
    date.value.getDate() + 1
  );
}

function decrementDate() {
  setDate(
    date.value.getFullYear(),
    date.value.getMonth(),
    date.value.getDate() - 1
  );
}

const day = computed(() => weekday[date.value.getDay()]);
const formattedDate = computed(() => {
  let month = date.value.getMonth() + 1;
  let day = date.value.getDate();
  let year = date.value.getFullYear();
  return `${month}/${day}/${year - 2000}`;
});

const displaySetup = ref(true);
</script>

<template>
  <main id="loggedInDisplay" v-if="isLoggedIn()">
    <div class="container-fluid">
      <div class="columns mb-5">
        <div class="column">
          <h1 class="title has-text-light ml-6" id="header">
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
          <div id="current-date-select">
            <a class="icon pr-3" @click.prevent="decrementDate"
              ><i class="fas fa-regular fa-arrow-left is-size-2"></i
            ></a>
            <div id="current-date" class="bubble">
              <div>
                <span class="icon"
                  ><i class="fas fa-calendar is-size-1"></i
                ></span>
              </div>
              <div>
                <p class="is-size-5">{{ day }}</p>
                <p class="is-size-5">{{ formattedDate }}</p>
              </div>
            </div>
            <a id="right-arrow" class="icon pl-3" @click.prevent="incrementDate"
              ><i class="fas fa-regular fa-arrow-right is-size-2"></i
            ></a>
          </div>
        </div>
        <div class="column is-8">
          <div class="setup-workout">
            <button
              id="add-workout-button"
              class="button"
              @click="displaySetup = true"
            >
              <p>Add Workout</p>
            </button>
            <div class="bubble" v-if="displaySetup">
              <label for="training-type"> Training Type: </label>
              <!-- class="button is-outlined is-white ml-5" -->
              <div class="select is-rounded is-medium">
                <select
                  name="training-type"
                  id="training-type"
                  class="button is-outlined is-white ml-5"
                >
                  <option value="bodybuilding">Bodybuilding</option>
                  <option value="powerlifting">Powerlifting</option>
                  <option value="crossfit">Crossfit</option>
                </select>
              </div>
              <!-- <span class="ml-5" id="training-type">Bodybuilding</span> -->
            </div>
            <div class="bubble" v-if="displaySetup">
              <p>Exercise Quantity: 1</p>
            </div>
            <button
              id="add-workout-submit"
              class="button mb-5"
              v-if="displaySetup"
              @click="displaySetup = false"
            >
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
  </main>
  <main v-else>
    <LoginView />
  </main>
</template>

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

p,
label {
  font-size: 2rem;
}

.container-fluid {
  margin: 0 2rem 0 6rem;
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
  box-shadow: 0.1rem 0.2rem 0.5rem 0rem #791a12;
  -webkit-box-shadow: 0.1rem 0.2rem 0.5rem 0rem #791a12;
  -moz-box-shadow: 0.1rem 0.2rem 0.5rem 0rem #791a12;
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

#add-workout-button {
  border-radius: 1.8rem;
  width: fit-content;
  margin-top: 0.6rem;
  margin-bottom: 2rem;
  color: white;
  background-color: #791a12;
  padding: 2rem 3rem;
  border: none;
}

#add-workout-button:hover {
  background-color: rgba(143, 35, 25, 0.918);
}

.setup-workout .bubble:first-child {
  padding: 1em 5em;
}

/* #training-type {
  border-radius: 3rem;
} */

#add-workout-submit {
  border-radius: 1.8rem;
  width: fit-content;
  margin-bottom: 1rem;
  color: white;
  background-color: #791a12;
  padding: 1rem 2rem;
  border: none;
}

#add-workout-submit:hover {
  background-color: rgba(143, 35, 25, 0.918);
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

#current-date {
  border-radius: 3rem;
  line-height: 1.8rem;
  padding: 0.5rem 2rem;
  min-width: 13rem;
  display: flex;
}

#current-date div:first-child span {
  margin-top: 1rem;
  margin-right: 1.3rem;
}

#current-date-select {
  display: flex;
  align-items: center;
  /* justify-content: space-around; */
}

#current-date-select a {
  margin: 0.3rem;
  color: white;
}

#right-arrow {
  z-index: 1;
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
  width: 18rem;
  height: 18rem;
  background-image: url(../assets/RPE-scale.webp);
  background-position: center center;
  background-repeat: no-repeat;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: 100% 100%;
}
</style>
