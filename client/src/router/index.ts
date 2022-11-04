import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/start-workout",
      name: "start-workout",
      component: () => import("../views/StartWorkoutView.vue"),
    },
    {
      path: "/my-workouts",
      name: "my-workouts",
      component: () => import("../views/MyWorkoutsView.vue"),
    },
    {
      path: "/social",
      name: "social",
      component: () => import("../views/SocialView.vue"),
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("../views/AdminView.vue"),
    },
  ],
});

export default router;
