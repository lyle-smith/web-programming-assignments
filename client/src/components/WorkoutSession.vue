<template>
  <div class="bubble px-4 py-3 mt-6">
    <p class="pl-5 pb-3 pt-4">Bodybuilding Workout</p>
    <div id="exercise-list">
      <p></p>
      <p>Weight</p>
      <p>Sets</p>
      <p>Reps</p>
      <p>RPE</p>
      <p>Deadlift</p>
      <input class="button is-outlined is-white" type="number" />
      <input class="button is-outlined is-white" type="number" />
      <input class="button is-outlined is-white" type="number" />
      <input class="button is-outlined is-white" type="number" />
      <button class="button is-outlined is-white pl-3" id="add-exercise">
        <span class="icon pr-4"><i class="fa fa-plus"></i></span> Add Exercise
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

<script setup lang="ts"></script>

<style scoped>
p {
  text-align: center;
  font-size: 2rem;
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

#exercise-list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  align-items: center;
  column-gap: 1rem;
  row-gap: 1rem;
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
