<template>
  <div class="column is-1">
    <figure class="image is-96x96">
      <img src="../assets/bill-gates-pic.webp" class="is-rounded" />
    </figure>
  </div>
  <div class="column is-4">
    <p>
      <span class="has-text-weight-semibold pr-1"
        >{{ firstName }} {{ lastName }}</span
      >
      <small
        ><span class="is-italic pr-3">@{{ username }}</span>
        <span>Thursday, October 20, 2022</span></small
      >
    </p>
    <p class="is-size-5">
      Completed a
      <span class="has-text-weight-semibold">{{ workoutType }} workout</span> in
      <span class="has-text-weight-semibold">{{ workoutTime }}</span>
    </p>
  </div>
</template>

<script>
// const date = Date.now()
// const year = date.getYear();
export default {
  props: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    workoutType: {
      type: String,
      required: true,
    },
    workoutTime: {
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
</style>
