<template>
  <main v-if="isLoggedIn()">
    <div class="columns is-centered mt-5">
      <div class="column is-5 has-text-centered">
        <h2 class="title is-3">My Feed</h2>
      </div>
    </div>
    <div class="columns is-centered">
      <Workout
        :first-name="firstName1"
        :last-name="lastName1"
        :username="userName1"
        workout-type="hypertrophy"
        workout-time="1.5"
        time-unit="hours"
        :profile-picture="profilePicture1"
      />
    </div>
    <div class="columns is-centered mt-4">
      <Workout
        :first-name="firstName2"
        :last-name="lastName2"
        :username="userName2"
        workout-type="strength"
        workout-time="1"
        time-unit="hours"
        :profile-picture="profilePicture2"
      />
    </div>
    <div class="columns is-centered mt-4">
      <Workout
        :first-name="firstName3"
        :last-name="lastName3"
        :username="userName3"
        workout-type="cardio"
        workout-time="50"
        time-unit="minutes"
        :profile-picture="profilePicture3"
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

let randomIndex1 = Math.floor(Math.random() * 3);
let firstName1 = session.users[randomIndex1]?.firstName;
let lastName1 = session.users[randomIndex1]?.lastName;
let userName1 = session.users[randomIndex1]?.userName;
let profilePicture1 = session.users[randomIndex1]?.profilePicture;

let randomIndex2 = Math.floor(Math.random() * 3);
let firstName2 = session.users[randomIndex2]?.firstName;
let lastName2 = session.users[randomIndex2]?.lastName;
let userName2 = session.users[randomIndex2]?.userName;
let profilePicture2 = session.users[randomIndex2]?.profilePicture;

let randomIndex3 = Math.floor(Math.random() * 3);
let firstName3 = session.users[randomIndex3]?.firstName;
let lastName3 = session.users[randomIndex3]?.lastName;
let userName3 = session.users[randomIndex3]?.userName;
let profilePicture3 = session.users[randomIndex3]?.profilePicture;
</script>

<style scoped></style>
