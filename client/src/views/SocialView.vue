<template>
  <main v-if="isLoggedIn()">
    <div class="columns is-centered mt-5">
      <div class="column is-5 has-text-centered">
        <h2 class="title is-3">My Feed</h2>
      </div>
    </div>
    <div class="columns is-centered">
      <WorkoutPost
        first-name="Max"
        last-name="Payne"
        username="userName1"
        workout-type="hypertrophy"
        workout-time="1.5"
        time-unit="hours"
        profile-picture="profilePicture1"
      />
    </div>
    <div class="columns is-centered mt-4">
      <WorkoutPost
        first-name="Carl"
        last-name="Janx"
        username="userName2"
        workout-type="strength"
        workout-time="1"
        time-unit="hours"
        profile-picture="profilePicture2"
      />
    </div>
    <div class="columns is-centered mt-4">
      <WorkoutPost
        first-name="Lyle"
        last-name="Smith"
        username="userName3"
        workout-type="cardio"
        workout-time="50"
        time-unit="minutes"
        profile-picture="profilePicture3"
      />
    </div>
  </main>
  <main v-else>
    <LoginView />
  </main>
</template>

<script setup lang="ts">
import { isLoggedIn } from "../stores/session";
import LoginView from "./LoginView.vue";
import WorkoutPost from "../components/WorkoutPost.vue";
</script>

<style scoped></style>
