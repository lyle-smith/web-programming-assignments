<template>
  <main v-if="isLoggedIn()">
    <div class="columns is-centered mt-5">
      <div class="column is-5 has-text-centered">
        <h2 class="title is-3">My Workouts</h2>
        <button class="button" @click="toggleAddWorkoutForm">
          Add Workout {{ displayAddWorkoutForm }}
        </button>
        <div class="field has-addons" v-if="displayAddWorkoutForm">
          <p class="control">
            <span class="select">
              <select>
                <option selected="true" disabled>Workout Type</option>
                <option>Strength</option>
                <option>Hypertrophy</option>
                <option>Endurance</option>
                <option>Calisthenics</option>
                <option>Cardio</option>
              </select>
            </span>
          </p>
          <p class="control">
            <input class="input" type="number" required />
          </p>
          <p class="control">
            <span class="select">
              <select>
                <option selected="true" disabled>Time Unit</option>
                <option>Minutes</option>
                <option>Hours</option>
              </select>
            </span>
          </p>
        </div>
      </div>
    </div>
    <div class="columns is-centered">
      <Workout
        :first-name="session.user?.firstName"
        :last-name="session.user?.lastName"
        :username="session.user?.userName"
        workout-type="strength"
        workout-time="40 minutes"
        :profile-picture="session.user?.profilePicture"
      />
    </div>
    <div class="columns is-centered mt-4">
      <Workout
        :first-name="session.user?.firstName"
        :last-name="session.user?.lastName"
        :username="session.user?.userName"
        workout-type="strength"
        workout-time="2 hours"
        :profile-picture="session.user?.profilePicture"
      />
    </div>
    <div class="columns is-centered mt-4">
      <Workout
        :first-name="session.user?.firstName"
        :last-name="session.user?.lastName"
        :username="session.user?.userName"
        workout-type="cardio"
        workout-time="16 minutes"
        :profile-picture="session.user?.profilePicture"
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

let displayAddWorkoutForm = false;

function toggleAddWorkoutForm() {
  displayAddWorkoutForm = true;
}
</script>

<style scoped></style>
