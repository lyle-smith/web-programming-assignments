<script setup lang="ts">
import { sendFriendRequest } from "@/stores/users";
import { ref } from "vue";
import session from "../stores/session";

const addedFriend = ref("");
</script>

<template>
  <div class="container">
    <div class="columns mt-5">
      <div class="column is-3"></div>
      <div class="column">
        <h3 class="title is-3">Friends</h3>
        <div class="field has-addons">
          <div class="control">
            <input
              class="input"
              type="text"
              v-model="addedFriend"
              placeholder="Add Friend"
            />
          </div>
          <div class="control">
            <a
              class="button is-info"
              @click="
                sendFriendRequest(
                  session.user?.userName ? session.user.userName : '',
                  addedFriend
                )
              "
              >Send Request</a
            >
          </div>
        </div>
        <p>lyman93</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
