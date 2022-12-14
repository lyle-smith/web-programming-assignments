<script setup lang="ts">
import { isAdmin } from "../stores/session";
import { getUsers, deleteUser, createAdmin, createUser } from "../stores/users";
import { ref, watch } from "vue";
import LoginView from "./LoginView.vue";

let users = ref();
getUsers().then((x) => {
  users.value = x;
});

function deleteUserUpdatePage(userName: string) {
  console.log(adminStatus.value);
  deleteUser(userName).then(() => {
    getUsers().then((x) => {
      users.value = x;
    });
  });
}

const adminStatus = ref(false);
const username = ref("username");
const password = ref("password");
const email = ref("email");

function create() {
  if (adminStatus.value) {
    createAdmin(username.value, email.value, password.value).then(() => {
      getUsers().then((x) => {
        users.value = x;
      });
    });
  } else {
    createUser(username.value, email.value, password.value).then(() => {
      getUsers().then((x) => {
        users.value = x;
      });
    });
  }
  getUsers().then((x) => {
    users.value = x;
  });
  addingUser.value = false;
}

const addingUser = ref(false);
</script>

<template>
  <main v-if="isAdmin()">
    <div class="table-container column is-7 mx-auto">
      <table class="table is-fullwidth mt-6">
        <thead>
          <tr>
            <th></th>
            <th>Username</th>
            <th>Email</th>
            <th>Is Admin</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user._id">
            <td>
              <figure class="image is-64x64">
                <img :src="user.profilePicture" class="is-rounded" />
              </figure>
            </td>
            <td>{{ user.userName }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.isAdmin }}</td>
            <td>
              <button
                class="button is-danger"
                @click="deleteUserUpdatePage(user.userName)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="addingUser">
        <div class="field is-horizontal">
          <div class="field-body">
            <div class="field-label is-normal">
              <label class="label">UserName</label>
            </div>
            <div class="field">
              <p class="control is-expanded has-icons-left">
                <input class="input" type="text" v-model="username" />
                <span class="icon is-small is-left">
                  <i class="fas fa-user"></i>
                </span>
              </p>
            </div>
            <div class="field-label is-normal">
              <label class="label">Email</label>
            </div>
            <div class="field">
              <p class="control is-expanded has-icons-left has-icons-right">
                <input
                  class="input is-success"
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
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-body">
            <div class="field-label is-normal">
              <label class="label">Password</label>
            </div>
            <div class="field">
              <p class="control is-expanded has-icons-left">
                <input class="input" type="password" v-model="password" />
                <span class="icon is-small is-left">
                  <i class="fas fa-lock"></i>
                </span>
              </p>
            </div>
            <label class="checkbox">
              <input type="checkbox" v-model="adminStatus" />
              Admin
            </label>
          </div>
        </div>
        <button class="button is-dark is-fullwidth" @click="create()">
          Create User
        </button>
      </div>
      <button
        class="button is-dark is-fullwidth"
        v-if="!addingUser"
        @click="addingUser = true"
      >
        Add User
      </button>
    </div>
  </main>
  <main v-else>
    <LoginView />
  </main>
</template>

<style scoped>
img {
  height: 100%;
  width: 100%;
}
</style>
