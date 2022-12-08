import myFetch from "@/services/my-fetch";
import { computed, reactive } from "vue";
import type { User } from "./users";

const session = reactive({
  user: null as User | null,
  loading: 0,
  error: null as string | null,
  messages: [] as Message[],
  users: [] as User[],
  latestWorkoutHistoryId: 1,
});

export function setError(error: string | null) {
  session.error = error;
  if (error) {
    session.messages.push({ type: "danger", text: error });
  }
}

export const isLoading = computed(() => !!session.loading);

export async function api<T>(url: string, data: any = null, method?: string) {
  session.loading++;
  setError(null);
  try {
    return await myFetch<T>(url, data, method);
  } catch (error) {
    setError(error as string);
  } finally {
    session.loading--;
  }
  return {} as T;
}

export interface Message {
  text: string;
  type: "danger" | "warning" | "success" | "info";
}

export function removeUser(user: User) {
  const index = session.users.indexOf(user);
  if (index > -1) {
    session.users.splice(index, 1);
  }
}

export function login(userName: string) {
  api<User>(`/users/${userName}`).then((user) => {
    if (user) {
      session.user = user;
    } else {
      setError("Invalid user name");
    }
  });
}

export function logout() {
  session.user = null;
}

export function isLoggedIn() {
  return session.user !== null;
}

export function isAdmin() {
  if (isLoggedIn()) {
    return session.user?.isAdmin;
  } else {
    return false;
  }
}

export class WorkoutSession {
  public name: string;
  public duration: number;
  public timeUnit: string;
  public id: number;

  constructor(name: string, duration: number, timeUnit: string) {
    this.name = name;
    this.duration = duration;
    this.timeUnit = timeUnit;
    this.id = session.latestWorkoutHistoryId;
    session.latestWorkoutHistoryId++;
  }
}

export default session;
