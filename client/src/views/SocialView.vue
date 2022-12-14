<template>
  <main v-if="isLoggedIn()">
    <div class="columns is-centered mt-5">
      <div class="column is-5 has-text-centered">
        <h2 class="title is-3">My Feed</h2>
      </div>
    </div>
    <div
      class="columns is-centered mt-4"
      v-for="post in posts"
      :key="post.userName"
    >
      <WorkoutPost
        v-if="session.user"
        :username="post.userName"
        :workout-type="post.trainingType"
        :profile-picture="post.profilePicture"
        :date="formatDate(new Date(post.date))"
      />
    </div>
  </main>
  <main v-else>
    <LoginView />
  </main>
</template>

<script setup lang="ts">
import session, { isLoggedIn } from "../stores/session";
import LoginView from "./LoginView.vue";
import WorkoutPost from "../components/WorkoutPost.vue";
import { getSocialWorkouts } from "@/stores/workouts";
import { ref } from "vue";

interface Post {
  userName: string;
  trainingType: string;
  date: Date;
  profilePicture: string;
}

function sortByDate(a: Post, b: Post) {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}

const posts = ref([] as Post[]);

if (session.user) {
  getSocialWorkouts(session.user.userName).then((workouts) => {
    for (let i = 0; i < workouts.length; i++) {
      const post = {
        userName: "",
        trainingType: "",
        date: new Date(),
        profilePicture: "",
      };

      const friend = session.user?.friends.find(
        (friend) => friend._id === workouts[i].userId
      );

      if (friend) {
        post.userName = friend.userName;
        post.profilePicture = friend?.profilePicture;
      } else if (session.user && session.user._id === workouts[i].userId) {
        post.userName = session.user.userName;
        post.profilePicture = session.user.profilePicture;
      }
      post.trainingType = workouts[i].trainingType;
      post.date = new Date(workouts[i].date);
      posts.value.push(post);
    }
    posts.value.sort(sortByDate);
  });
  // getUserWorkouts(session.user?.userName).then((workouts) => {
  //   posts.value = workouts;
  // });
  // for (let i = 0; i < session.user.friends.length; i++) {
  //   getUserWorkouts(session.user.friends[i].userName).then((workouts) => {
  //     posts.value = posts.value.concat(workouts);
  //   });
  // }
  // session.user.friends.forEach((friend) => {
  //   getUserWorkouts(friend.userName).then((workouts) => {
  //     posts.value.concat(workouts);
  //   });
  // });
  // posts.value = posts.value.sort(sortByDate);
}

function formatDate(date: Date) {
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}
</script>

<style scoped></style>
