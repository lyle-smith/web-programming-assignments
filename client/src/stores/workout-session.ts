export interface WorkoutSession {
  _id: string;
  userId: string;
  date: Date;
  workoutType: string;
  exercises: Exercise[];
}

export interface Exercise {
  name: string;
  weight: number;
  sets: number;
  reps: number;
  rpe: number;
}
