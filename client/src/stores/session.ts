import { reactive } from "vue";

const session = reactive({
  user: null as User | null,
  users: [] as User[],
});

export function addUser(
  firstName: string,
  lastName: string,
  userName: string,
  email: string,
  isAdmin: boolean,
  profilePicture: string
) {
  if (!session.users.find((u) => u.userName === userName)) {
    const user = new User(
      firstName,
      lastName,
      userName,
      email,
      isAdmin,
      profilePicture
    );
    session.users.push(user);
  }
}

export function removeUser(user: User) {
  const index = session.users.indexOf(user);
  if (index > -1) {
    session.users.splice(index, 1);
  }
}

export function login(userName: string) {
  session.users.forEach((user) => {
    if (user.userName === userName) {
      session.user = user;
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

export class User {
  public firstName: string;
  public lastName: string;
  public userName: string;
  public email: string;
  public isAdmin: boolean;
  public profilePicture: string;

  constructor(
    firstName: string,
    lastName: string,
    userName: string,
    email: string,
    isAdmin: boolean,
    profilePicture: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.email = email;
    this.isAdmin = isAdmin;
    this.profilePicture = profilePicture;
  }
}

export default session;
