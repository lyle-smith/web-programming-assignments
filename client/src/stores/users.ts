import type { WorkoutSession } from "./workout-session";

export interface User {
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  email: string;
  isAdmin: boolean;
  profilePicture: string;
  workoutHistory: WorkoutSession[];
}
