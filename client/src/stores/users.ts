import session, { api } from "./session";
import type { WorkoutSession } from "./workout-session";
import type { Message } from "./session";

export interface User {
  userName: string;
  password: string;
  email: string;
  isAdmin: boolean;
  profilePicture: string;
  workoutHistory: WorkoutSession[];
}

export function createUser(userName: string, email: string, password: string) {
  return api<Message>("users/createUser", { userName, email, password }).then(
    (res) => {
      if (res.type === "danger") session.messages.push(res);
    }
  );
}

export function getUser(userName: string) {
  return api<User>(`users/${userName}`);
}

export function authenticate(userName: string, password: string) {
  return api<User | Message>(`users/authenticate`, {
    userName,
    password,
  }).then((res) => {
    if ("password" in res && "userName" in res) {
      if (res.password === password && res.userName === userName)
        session.user = res;
    } else {
      console.log("user does not exist");
      session.messages.push(res);
    }
  });
}
