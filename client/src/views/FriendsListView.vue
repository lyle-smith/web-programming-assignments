<script setup lang="ts">
import {
  sendFriendRequest,
  getFriends,
  searchUsers,
  type User,
} from "@/stores/users";
import { ref, watch } from "vue";
import session, { isLoggedIn } from "../stores/session";
import LoginView from "./LoginView.vue";

const userSearch = ref("");
const results = ref([""]);
const isOpen = ref(false);
const autoCompleted = ref(false);

watch(userSearch, () => {
  if (userSearch.value.length > 0 && !autoCompleted.value) {
    searchUsers(userSearch.value).then((res) => {
      results.value = res
        .map((user) => user.userName)
        .filter((item) => {
          if (session.user)
            return (
              item.toLowerCase() !== session.user.userName.toLowerCase() &&
              item.toLowerCase().indexOf(userSearch.value.toLowerCase()) > -1
            );
        });
      if (results.value.length > 0 && userSearch.value.length > 0) {
        isOpen.value = true;
      } else {
        isOpen.value = false;
      }
    });
  } else {
    autoCompleted.value = false;
    isOpen.value = false;
  }
});

function selectSearchResult(result: string) {
  userSearch.value = result;
  isOpen.value = false;
  autoCompleted.value = true;
}

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
  <main v-if="isLoggedIn()">
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
                v-model="userSearch"
                placeholder="Lookup username"
              />
            </div>
            <div class="control">
              <a
                class="button is-info"
                @click="
                  sendRequest(
                    session.user?.userName ? session.user.userName : '',
                    userSearch
                  )
                "
                >Send Request</a
              >
            </div>
          </div>
          <ul v-show="isOpen" class="autocomplete-results">
            <li
              v-for="(result, i) in results"
              :key="i"
              class="autocomplete-result"
              @click="selectSearchResult(result)"
            >
              {{ result }}
            </li>
          </ul>
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
  </main>
  <main v-else>
    <LoginView />
  </main>
</template>

<style scoped>
.friend-item {
  display: inline-block;
  vertical-align: middle;
  margin: 1em;
}

.autocomplete-results {
  padding: 0;
  margin: 0;
  border: 1px solid #eeeeee;
  min-height: 1rem;
  max-height: 4rem;
  width: 22rem;
  overflow: auto;
}

.autocomplete-result {
  list-style: none;
  text-align: left;
  padding: 4px 2px;
  cursor: pointer;
}

.autocomplete-result:hover {
  background-color: #4972f9;
  color: white;
}
</style>
