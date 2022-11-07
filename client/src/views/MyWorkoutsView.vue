<template>
  <main v-if="isLoggedIn()">
    <div class="columns is-centered mt-5">
      <div class="column is-5 has-text-centered">
        <h2 class="title is-3">My Workouts</h2>
        <button class="button" @click="displayAddWorkout = !displayAddWorkout">
          Add Workout
        </button>
        <div id="add-workout-form" class="pt-4" v-if="displayAddWorkout">
          <div class="field is-horizontal">
            <div class="field-label is-fullwidth">
              <label class="label">Workout type</label>
            </div>
            <div class="field-body">
              <div class="field is-narrow">
                <div class="control">
                  <div class="select">
                    <select v-model="workoutType">
                      <option>Strength</option>
                      <option>Hypertrophy</option>
                      <option>Endurance</option>
                      <option>Calisthenics</option>
                      <option>Cardio</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Duration</label>
            </div>
            <div class="field-body">
              <div class="field has-addons">
                <div class="control">
                  <input
                    class="input"
                    type="number"
                    v-model="duration"
                    required
                  />
                </div>
                <p class="control">
                  <span class="select">
                    <select v-model="timeUnit">
                      <option>Minutes</option>
                      <option>Hours</option>
                    </select>
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div class="control">
            <button
              type="submit"
              class="button is-danger"
              @click="
                session.user?.addWorkoutSession(
                  workoutType,
                  duration,
                  timeUnit
                );
                displayAddWorkout = false;
              "
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="columns is-centered">
      <WorkoutPost
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
      <WorkoutPost
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
      <WorkoutPost
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
      v-for="workout in session.user?.workoutHistory"
      :key="workout.id"
    >
      <WorkoutPost
        :first-name="session.user?.firstName"
        :last-name="session.user?.lastName"
        :username="session.user?.userName"
        :workout-type="workout.name"
        :workout-time="workout.duration.toString()"
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
import session, { isLoggedIn } from "../stores/session";
import LoginView from "./LoginView.vue";
import WorkoutPost from "../components/WorkoutPost.vue";
import { ref } from "vue";

let displayAddWorkout = ref(false);
let timeUnit = ref("Minutes");
let duration = ref(0);
let workoutType = ref("Strength");
</script>

<style scoped>
@media screen and (min-width: 769px), print {
  .field-label {
    flex-grow: 2;
  }
} ;
</style>
