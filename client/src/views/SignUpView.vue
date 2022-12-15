<script setup lang="ts">
import { ref, watch } from "vue";
import { RouterLink } from "vue-router";
import { createUser } from "../stores/users";
import router from "@/router";

let email = ref("");
let userName = ref("");
let password = ref("");

const created = ref(false);

watch(created, () => {
  if (created.value) {
    console.log("changing page...");
    router.push("/login");
  }
});
</script>

<template>
  <!-- <div class="container-fluid"> -->
  <div class="columns mt-6">
    <div class="column is-3"></div>
    <div class="column is-6">
      <h3 class="subtitle is-3">Sign Up</h3>
      <div class="field">
        <label class="has-text-weight-bold" for="username">Username</label>
        <p class="control has-icons-left has-icons-right">
          <input
            class="input"
            type="text"
            placeholder="Username"
            v-model="userName"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-check"></i>
          </span>
        </p>
      </div>
      <div class="field">
        <label class="has-text-weight-bold" for="email">Email</label>
        <p class="control has-icons-left has-icons-right">
          <input
            class="input"
            type="email"
            placeholder="Email"
            v-model="email"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-check"></i>
          </span>
        </p>
      </div>
      <div class="field">
        <label class="has-text-weight-bold" for="password">Password</label>
        <p class="control has-icons-left">
          <input
            class="input"
            type="password"
            placeholder="Password"
            v-model="password"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </p>
      </div>
      <div class="field">
        <p class="control">
          <button
            class="button is-danger is-fullwidth has-text-weight-bold"
            @click="
              createUser(userName, email, password).then((res) => {
                if (res) created = true;
              })
            "
          >
            <span class="is-size-5">Sign Up</span>
          </button>
        </p>
      </div>
      <span id="login"
        >Already have an account?
        <RouterLink to="/login">Log in</RouterLink></span
      >
    </div>
    <div class="column is-3"></div>
  </div>
</template>

<style scoped>
.field {
  margin-bottom: 1rem;
}

#login {
  float: right;
}

button {
  border-radius: 0.7rem;
}
</style>
