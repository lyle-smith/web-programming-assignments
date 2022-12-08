import session, { api } from "./session";
import type { Message } from "./session";
import { computed, ref } from "vue";

export const workoutSession = ref([] as Workout[]);

export const workoutDate = ref(new Date());

export const formattedWorkoutDate = computed(() => {
  const month = workoutDate.value.getMonth() + 1;
  const day = workoutDate.value.getDate();
  const year = workoutDate.value.getFullYear();
  return `${month}/${day}/${year - 2000}`;
});

export interface Workout {
  _id: string;
  userId: string;
  date: Date;
  trainingType: "strength" | "hypertrophy" | "endurance" | "crossfit";
}

export function getUserWorkouts(userName: string) {
  return api<Workout[] | Message>(`workouts/${userName}`).then((res) => {
    if ("text" in res) {
      console.log("user does not exist");
      session.messages.push(res);
      return [];
    } else {
      return res;
    }
  });
}

export function getUserWorkoutsForDate(
  userName: string | undefined,
  date: Date
) {
  return api<Workout[] | Message>(`workouts/date-workouts`, {
    userName,
    date,
  }).then((res) => {
    if ("text" in res) {
      console.log("user does not exist");
      session.messages.push(res);
      return [];
    } else {
      return res;
    }
  });
}

export function addWorkout(
  userName: string | undefined,
  trainingType: string,
  exerciseQuantity: number,
  date: Date
) {
  return api<Workout | Message>(`workouts/add-workout`, {
    userName,
    trainingType,
    exerciseQuantity,
    date,
  }).then((res) => {
    if ("text" in res) {
      console.log("user does not exist");
      session.messages.push(res);
    } else {
      workoutSession.value.push(res);
      return res;
    }
  });
}
