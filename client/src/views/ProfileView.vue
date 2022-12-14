<script setup lang="ts">
import { ref } from "vue";
import session, { isLoggedIn } from "../stores/session";
import { editProfile } from "@/stores/users";
import LoginView from "./LoginView.vue";

const editing = ref(false);
const newUserName = ref(session.user?.userName);
const newEmail = ref(session.user?.email);

function saveProfile() {
  if (session.user && newUserName.value && newEmail.value) {
    editProfile(session.user.userName, newUserName.value, newEmail.value);
  } else {
    session.messages.push({
      text: "Please fill out all fields",
      type: "danger",
    });
  }
  editing.value = false;
}

function cancelEdit() {
  newUserName.value = session.user?.userName;
  newEmail.value = session.user?.email;
  editing.value = false;
}
</script>

<template>
  <main v-if="isLoggedIn()">
    <div class="container">
      <div class="columns mt-5">
        <div class="column is-3"></div>
        <div class="column edit-profile">
          <h3 class="title is-2 profile">Profile</h3>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Username</label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control">
                  <input
                    v-model="newUserName"
                    class="input"
                    :class="{ 'is-static': !editing }"
                    type="text"
                    :readonly="!editing"
                  />
                </p>
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Email</label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control">
                  <input
                    v-model="newEmail"
                    class="input"
                    :class="{ 'is-static': !editing }"
                    type="email"
                    :readonly="!editing"
                  />
                </p>
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Weight</label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control">
                  <input
                    class="input"
                    :class="{ 'is-static': !editing }"
                    type="number"
                    value="0"
                    :readonly="!editing"
                  />
                </p>
              </div>
            </div>
          </div>
          <button class="button mt-5" v-if="!editing" @click="editing = true">
            Edit Profile
          </button>
          <button class="button mt-5" v-if="editing" @click="saveProfile()">
            Save Changes
          </button>
          <button class="button mt-5" v-if="editing" @click="cancelEdit()">
            Cancel
          </button>
        </div>
        <div class="column is-3"></div>
      </div>
    </div>
  </main>
  <main v-else>
    <LoginView />
  </main>
</template>

<style scoped></style>
