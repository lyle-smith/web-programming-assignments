<script setup lang="ts">
import session, { isLoggedIn } from "../stores/session";
import LoginView from "./LoginView.vue";
import WorkoutPost from "../components/WorkoutPost.vue";
import { ref } from "vue";
import { getUserWorkouts, type Workout, sortByDate } from "../stores/workouts";

const workoutList = ref([] as Workout[]);

if (session.user)
  getUserWorkouts(session.user?.userName).then((workouts) => {
    workoutList.value = workouts.sort(sortByDate);
  });

function formatDate(date: Date) {
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}
</script>

<template>
  <main v-if="isLoggedIn()">
    <div class="columns is-centered mt-5">
      <div class="column is-5 has-text-centered">
        <h2 class="title is-3">My Workouts</h2>
      </div>
    </div>
    <div
      class="columns is-centered mt-4"
      v-for="workout in workoutList"
      :key="workout._id"
    >
      <WorkoutPost
        v-if="session.user"
        :username="session.user?.userName"
        :workout-type="workout.trainingType"
        :profile-picture="session.user?.profilePicture"
        :date="formatDate(new Date(workout.date))"
      />
    </div>
  </main>
  <main v-else>
    <LoginView />
  </main>
</template>

<style scoped>
@media screen and (min-width: 769px), print {
  .field-label {
    flex-grow: 2;
  }
} ;
</style>
