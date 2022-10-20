import { reactive } from "vue";

const session = reactive({
  user: null as User | null,
});

export function login(firstName: string, lastName: string, isAdmin: boolean) {
  session.user = { firstName, lastName, isAdmin };
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

export class User {
  public firstName?: string;
  public lastName?: string;
  public isAdmin?: boolean;
}

export default session;
