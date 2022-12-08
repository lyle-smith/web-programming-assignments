<script setup lang="ts">
import session, { isLoggedIn } from "../stores/session";
import LoginView from "./LoginView.vue";
import WorkoutSession from "../components/WorkoutSession.vue";
import { computed, ref, watch } from "vue";
import {
  addWorkout,
  formattedWorkoutDate,
  getUserWorkoutsForDate,
  workoutDate,
  workoutSession,
} from "../stores/workouts";
import { addExercise } from "../stores/exercises";

workoutDate.value = new Date();

const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function incrementDate() {
  setDate(
    workoutDate.value.getFullYear(),
    workoutDate.value.getMonth(),
    workoutDate.value.getDate() + 1
  );
}

function decrementDate() {
  setDate(
    workoutDate.value.getFullYear(),
    workoutDate.value.getMonth(),
    workoutDate.value.getDate() - 1
  );
}

function setDayOfWeek(dayIndex: number) {
  if (dayIndex < workoutDate.value.getDay()) {
    const dateDifference = workoutDate.value.getDay() - dayIndex;
    for (let i = 0; i < dateDifference; i++) {
      decrementDate();
    }
  } else if (dayIndex > workoutDate.value.getDay()) {
    const dateDifference = dayIndex - workoutDate.value.getDay();
    for (let i = 0; i < dateDifference; i++) {
      incrementDate();
    }
  }
}

function setDate(year: number, month: number, day: number) {
  workoutDate.value = new Date(year, month, day);
}

const dayOfWeek = computed(() => weekday[workoutDate.value.getDay()]);

const displaySetup = ref(false);

function addWorkoutSession(
  userName: string | undefined,
  trainingType: string,
  exerciseQuantity: number,
  date: Date
) {
  if (exerciseQuantity < 0) {
    session.messages.push({
      text: "Error: Exercise quantity must be a valid number",
      type: "danger",
    });
    return;
  }
  addWorkout(userName, trainingType, exerciseQuantity, date).then(
    async (workout) => {
      for (let i = 0; i < exerciseQuantity; i++) {
        console.log("adding exercises");
        await addExercise(userName, workout?._id);
      }
    }
  );
  displaySetup.value = false;
}

const exerciseQuantity = ref(1);
const trainingType = ref("bodybuilding");

const loggedIn = computed(() => {
  console.log("change");
  if (session.user) return true;
  else return false;
});

watch(loggedIn, () => {
  if (loggedIn.value)
    getUserWorkoutsForDate(
      session.user?.userName,
      new Date(formattedWorkoutDate.value)
    ).then((x) => {
      workoutSession.value = x;
    });
});

watch(formattedWorkoutDate, () => {
  if (session.user)
    getUserWorkoutsForDate(
      session.user?.userName,
      new Date(formattedWorkoutDate.value)
    ).then((x) => {
      workoutSession.value = x;
      if (workoutSession.value.length > 0)
        console.log(
          workoutSession.value.length +
            " " +
            workoutSession.value[0].trainingType
        );
      // console.log(workoutSession.value[0].exercises[0].name);
    });
});
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
                <p class="is-size-5">{{ dayOfWeek }}</p>
                <p class="is-size-5">{{ formattedWorkoutDate }}</p>
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
              <div class="select is-rounded is-medium">
                <select
                  name="training-type"
                  id="training-type"
                  class="button is-outlined is-white ml-5"
                  v-model="trainingType"
                >
                  <option value="bodybuilding">Bodybuilding</option>
                  <option value="powerlifting">Powerlifting</option>
                  <option value="crossfit">Crossfit</option>
                </select>
              </div>
            </div>
            <div class="bubble" v-if="displaySetup">
              <label for="exercise-quantity">Exercise Quantity:</label>
              <input
                class="button is-outlined is-white mt-2 ml-5 is-rounded"
                type="number"
                name="exercise-quantity"
                id="exercise-quantity"
                v-model="exerciseQuantity"
              />
            </div>
            <div>
              <button
                class="button mb-5 add-workout-footer"
                v-if="displaySetup && session.user"
                @click="
                  addWorkoutSession(
                    session.user?.userName,
                    trainingType,
                    exerciseQuantity,
                    new Date(formattedWorkoutDate)
                  )
                "
              >
                <p>Add</p>
              </button>
              <button
                class="button mb-5 ml-3 add-workout-footer"
                v-if="displaySetup && session.user"
                @click="displaySetup = false"
              >
                <p>Cancel</p>
              </button>
            </div>
            <div class="bubble has-text-centered" id="date-select">
              <span v-for="(day, i) in weekday" :key="i">
                <a
                  href=""
                  :class="{ active: i == workoutDate.getDay() }"
                  @click.prevent="setDayOfWeek(i)"
                >
                  {{ day.slice(0, 1) }}</a
                >
                <span v-if="i !== 6">/</span>
              </span>
            </div>
            <WorkoutSession v-if="workoutSession.length > 0" />
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

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}

#exercise-quantity {
  width: 4rem;
}

.add-workout-footer {
  border-radius: 1.8rem;
  width: fit-content;
  margin-bottom: 1rem;
  color: white;
  background-color: #791a12;
  padding: 1rem 2rem;
  border: none;
}

/* #add-workout-submit {
  border-radius: 1.8rem;
  width: fit-content;
  margin-bottom: 1rem;
  color: white;
  background-color: #791a12;
  padding: 1rem 2rem;
  border: none;
}

#add-workout-cancel {
  border-radius: 1.8rem;
  width: fit-content;
  margin-bottom: 1rem;
  color: white;
  background-color: #791a12;
  padding: 1rem 2rem;
  border: none;
} */

.add-workout-footer:hover {
  background-color: rgba(143, 35, 25, 0.918);
}

.add-workout-footer p {
  font-size: 1.3rem;
}

#date-select {
  padding: 1rem 2rem;
  border-radius: 2em;
  font-size: 2rem;
}

#date-select span a {
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

.active {
  color: black;
  font-weight: bold;
  font-size: 2.4rem;
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
