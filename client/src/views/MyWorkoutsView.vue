<template>
  <main v-if="isLoggedIn()">
    <div class="columns is-centered mt-5">
      <div class="column is-5 has-text-centered">
        <h2 class="title is-3">My Workouts {{ timeUnit }}</h2>
        <button class="button" @click="displayAddWorkout = !displayAddWorkout">
          Add Workout
        </button>
        <div class="field has-addons" v-if="displayAddWorkout">
          <p class="control">
            <span class="select">
              <select v-model="workoutType">
                <option selected="true">Workout Type</option>
                <option>Strength</option>
                <option>Hypertrophy</option>
                <option>Endurance</option>
                <option>Calisthenics</option>
                <option>Cardio</option>
              </select>
            </span>
          </p>
          <p class="control">
            <input class="input" type="number" v-model="duration" required />
          </p>
          <p class="control">
            <span class="select">
              <select v-model="timeUnit">
                <option selected="true">Time Unit</option>
                <option>Minutes</option>
                <option>Hours</option>
              </select>
            </span>
          </p>
          <div class="control">
            <button
              type="submit"
              class="button is-primary"
              @click="
                addWorkoutSession(workoutType, duration, timeUnit);
                displayAddWorkout = false;
              "
            >
              Add Workout
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="columns is-centered">
      <Workout
        :first-name="session.user?.firstName"
        :last-name="session.user?.lastName"
        :username="session.user?.userName"
        workout-type="strength"
        workout-time="40"
        time-unit="minutes"
        :profile-picture="session.user?.profilePicture"
      />
    </div>
    <div class="columns is-centered mt-4">
      <Workout
        :first-name="session.user?.firstName"
        :last-name="session.user?.lastName"
        :username="session.user?.userName"
        workout-type="strength"
        workout-time="2"
        time-unit="hours"
        :profile-picture="session.user?.profilePicture"
      />
    </div>
    <div class="columns is-centered mt-4">
      <Workout
        :first-name="session.user?.firstName"
        :last-name="session.user?.lastName"
        :username="session.user?.userName"
        workout-type="cardio"
        workout-time="16"
        time-unit="minutes"
        :profile-picture="session.user?.profilePicture"
      />
    </div>
    <div
      class="columns is-centered mt-4"
      v-for="workout in session.workoutHistory"
    >
      <Workout
        :first-name="session.user?.firstName"
        :last-name="session.user?.lastName"
        :username="session.user?.userName"
        :workout-type="workout.name"
        :workout-time="workout.duration"
        :time-unit="workout.timeUnit"
        :profile-picture="session.user?.profilePicture"
      />
    </div>
  </main>
  <main v-else>
    <LoginView />
  </main>
</template>

<script setup lang="ts">
import session, { addWorkoutSession, isLoggedIn } from "../stores/session";
import LoginView from "./LoginView.vue";
import Workout from "../components/Workout.vue";
import { ref } from "vue";

let displayAddWorkout = ref(false);
let timeUnit = ref("Time Unit");
let duration = ref(0);
let workoutType = ref("Workout Type");
</script>

<style scoped></style>
