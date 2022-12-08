<template>
  <div class="column is-1">
    <figure class="image is-96x96">
      <img :src="profilePicture" class="is-rounded" />
    </figure>
  </div>
  <div class="column is-4">
    <p>
      <small
        ><span class="is-italic pr-3">@{{ username }}</span>
        <span>{{ date }}</span></small
      >
    </p>
    <p class="is-size-5">
      Completed a
      <span class="has-text-weight-semibold">{{ workoutType }}</span> workout
    </p>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    username: {
      type: String,
      required: true,
    },
    workoutType: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.column {
  border-bottom: 1px solid #beafaf;
}

img {
  height: 100%;
  width: 100%;
}
</style>
