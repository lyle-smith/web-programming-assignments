<script setup lang="ts">
import {
  workoutSession,
  getUserWorkoutsForDate,
  formattedWorkoutDate,
} from "../stores/workouts";
import session from "../stores/session";
import { watch, ref, computed } from "vue";
import { getExercisesForWorkout, addExercise } from "@/stores/exercises";

if (session.user)
  getUserWorkoutsForDate(
    session.user?.userName,
    new Date(formattedWorkoutDate.value)
  ).then((x) => {
    workoutSession.value = x;
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
    });
});

const currentWorkoutId = ref(workoutSession.value[0]._id);
const exerciseList = ref();

watch(workoutSession, () => {
  currentWorkoutId.value = workoutSession.value[0]._id;
});

const currentWorkout = computed(() => {
  return workoutSession.value.find(
    (workout) => workout._id === currentWorkoutId.value
  );
});

watch(currentWorkout, () => {
  if (currentWorkout.value)
    getExercisesForWorkout(currentWorkout.value?._id)?.then((x) => {
      exerciseList.value = x;
    });
});

function addExerciseToList(userName: string | undefined, workoutId: string) {
  addExercise(userName, workoutId)?.then((res) => {
    exerciseList.value.push(res);
  });
}

const currentWorkoutExercises = ref([]);
</script>

<template>
  <div class="bubble px-4 py-3 mt-6" v-if="session.user">
    <select class="button is-outlined is-white" v-model="currentWorkoutId">
      <option
        v-for="workout in workoutSession"
        :key="workout._id"
        :value="workout._id"
      >
        {{
          workout.trainingType.charAt(0).toUpperCase() +
          workout.trainingType.slice(1)
        }}
      </option>
    </select>
    <div id="exercise-list">
      <div class="row">
        <div style="width: 13.5%"></div>
        <p>Weight</p>
        <p>Sets</p>
        <p>Reps</p>
        <p>RPE</p>
      </div>
      <div class="row" v-for="(exercise, i) in exerciseList" :key="i">
        <p class="is-size-4">{{ exercise.name }}</p>
        <input
          class="button is-outlined is-white"
          type="number"
          :value="exercise.weight"
        />
        <input
          class="button is-outlined is-white"
          type="number"
          :value="exercise.sets"
        />
        <input
          class="button is-outlined is-white"
          type="number"
          :value="exercise.reps"
        />
        <input
          class="button is-outlined is-white"
          type="number"
          :value="exercise.rpe"
        />
      </div>
      <button
        class="button is-outlined is-white pl-4 ml-4"
        id="add-exercise"
        @click="addExerciseToList(session.user?.userName, currentWorkoutId)"
      >
        <span class="icon pr-4 pl-1"><i class="fa fa-plus"></i></span> Add
        Exercise
      </button>
    </div>
    <div id="exercise-list-footer">
      <p>Week 2</p>
      <p></p>
      <p>Save Log</p>
      <p id="delete-log" class="has-text-danger">Delete Log</p>
      <p></p>
    </div>
  </div>
</template>

<style scoped>
p {
  text-align: center;
  font-size: 2rem;
}

select {
  display: block;
  margin: 1.5rem auto;
  font-size: 1.5rem;
  border-radius: 3rem;
}

input {
  width: 100%;
  border-radius: 3rem;
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

.row {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 1rem;
}

.row p {
  font-size: 1.7rem;
}

.row input {
  width: 4rem;
  margin-left: 0.9rem;
}

#add-exercise {
  font-size: 1rem;
  border: 2px solid white;
  border-radius: 3rem;
  padding: 0.3rem;
}

#exercise-list-footer {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  align-items: flex-end;
  row-gap: 1rem;
  margin-top: 3rem;
  padding-bottom: 1rem;
}

#delete-log {
  font-size: 1.3rem;
}

.bubble {
  border-radius: 1rem;
  color: black;
  background-color: #791a12;
  min-width: 40rem;
}
</style>
