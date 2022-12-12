import session, { api } from "./session";
import type { Message } from "./session";

export interface User {
  _id: string;
  userName: string;
  password: string;
  email: string;
  isAdmin: boolean;
  profilePicture: string;
  friends: string[];
  friendRequests: string[];
}

export function createUser(userName: string, email: string, password: string) {
  return api<Message>("users/create-user", { userName, email, password }).then(
    (res) => {
      if (res.type === "danger") session.messages.push(res);
    }
  );
}

export function createAdmin(userName: string, email: string, password: string) {
  return api<Message>("users/create-admin", { userName, email, password }).then(
    (res) => {
      if (res.type === "danger") session.messages.push(res);
    }
  );
}

export function deleteUser(userName: string) {
  return api<Message>(`users/${userName}`, {}, "DELETE").then((res) => {
    if (res.type === "danger") session.messages.push(res);
  });
}

export function getUser(userName: string) {
  return api<User>(`users/${userName}`);
}

export function getUsers() {
  return api<User>(`users`);
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

export function sendFriendRequest(senderName: string, friendName: string) {
  return api<Message>(
    `users/send-friend-request`,
    {
      senderName,
      friendName,
    },
    "PATCH"
  ).then((res) => {
    session.messages.push(res);
  });
}
