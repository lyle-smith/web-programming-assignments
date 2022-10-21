<template>
  <main v-if="isLoggedIn()">
    <div class="columns is-centered mt-5">
      <div class="column is-5 has-text-centered">
        <h2 class="title is-3">My Workouts</h2>
      </div>
    </div>
    <div class="columns is-centered">
      <Workout
        :first-name="session.user?.firstName"
        :last-name="session.user?.lastName"
        :username="session.user?.userName"
        workout-type="strength"
        workout-time="40 minutes"
      />
    </div>
    <div class="columns is-centered mt-4">
      <Workout
        :first-name="session.user?.firstName"
        :last-name="session.user?.lastName"
        :username="session.user?.userName"
        workout-type="strength"
        workout-time="2 hours"
      />
    </div>
    <div class="columns is-centered mt-4">
      <Workout
        :first-name="session.user?.firstName"
        :last-name="session.user?.lastName"
        :username="session.user?.userName"
        workout-type="cardio"
        workout-time="16 minutes"
      />
    </div>
  </main>
  <main v-else>
    <LoginView />
  </main>
</template>

<script setup lang="ts">
import session, { isLoggedIn } from "../stores/session";
import LoginView from "./LoginView.vue";
import Workout from "../components/Workout.vue";
</script>

<style scoped></style>
