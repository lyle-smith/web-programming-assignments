import session, { api } from "./session";
import type { Message } from "./session";
import { computed, reactive, ref } from "vue";

export interface Exercise {
  _id: string;
  workoutId: string;
  name: string;
  weight: number;
  sets: number;
  reps: number;
  rpe: number;
}

export function addExercise(
  userName: string | undefined,
  workoutId: string | undefined
) {
  if (userName === undefined || workoutId === undefined) {
    console.log("EVERYTHING UNDEFINED");
    return;
  }
  return api<Exercise | Message>(`exercises/add-exercise`, {
    userName,
    workoutId,
  }).then((res) => {
    console.log(res);
    if ("text" in res) {
      console.log("user does not exist");
      session.messages.push(res);
    } else {
      return res;
    }
  });
}

export function getExercisesForWorkout(workoutId: string | undefined) {
  if (workoutId === undefined) {
    session.messages.push({
      text: "Workout ID undefined",
      type: "danger",
    });
    return;
  }
  return api<Exercise[] | Message>(`exercises/${workoutId}`).then((res) => {
    if ("text" in res) {
      console.log("user does not exist");
      session.messages.push(res);
      return [];
    } else {
      return res;
    }
  });
}
