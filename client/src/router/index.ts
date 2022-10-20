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
      path: "/my-workouts",
      name: "my-workouts",
      component: () => import("../views/MyWorkoutsView.vue"),
    },
    {
      path: "/social",
      name: "social",
      component: () => import("../views/SocialView.vue"),
    },
  ],
});

export default router;
