<script setup lang="ts">
import { sendFriendRequest, getFriends } from "@/stores/users";
import { ref } from "vue";
import session from "../stores/session";

const addedFriend = ref("");

function sendRequest(senderName: string, friendName: string) {
  sendFriendRequest(senderName, friendName).then((res) => {
    if (
      "text" in res &&
      res.text === "Friend successfully added" &&
      session.user
    )
      friendsList.value = getFriends(session.user.userName).then((friends) => {
        return friends;
      });
  });
}

const friendsList = ref();
if (session.user)
  friendsList.value = getFriends(session.user.userName).then((friends) => {
    console.log(friends);
    return friends;
  });
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
                sendRequest(
                  session.user?.userName ? session.user.userName : '',
                  addedFriend
                )
              "
              >Send Request</a
            >
          </div>
        </div>
        <div
          v-for="friend in session.user?.friends"
          :key="friend._id"
          id="friendsList"
        >
          <div>
            <figure class="image is-64x64 friend-item">
              <img :src="friend.profilePicture" class="is-rounded" />
            </figure>
            <p class="friend-item is-size-4 has-text-weight-semibold">
              {{ friend.userName }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.friend-item {
  display: inline-block;
  vertical-align: middle;
  margin: 1em;
}
</style>
