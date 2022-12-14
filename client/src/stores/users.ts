import session, { api } from "./session";
import type { Message } from "./session";
import {
  workoutSession,
  formattedWorkoutDate,
  getUserWorkoutsForDate,
} from "./workouts";

export interface User {
  _id: string;
  userName: string;
  password: string;
  email: string;
  isAdmin: boolean;
  profilePicture: string;
  friends: User[];
  friendRequests: string[];
}

export function getUsers() {
  return api<User[]>(`users`);
}

export function createUser(userName: string, email: string, password: string) {
  return api<Message>("users/create-user", { userName, email, password }).then(
    (res) => {
      if (res.type === "danger") {
        session.messages.push(res);
        return false;
      } else return true;
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

export function searchUsers(query: string) {
  return api<User[]>(`users/search/${query}`);
}

export function authenticate(userName: string, password: string) {
  return api<User | Message>(`users/authenticate`, {
    userName,
    password,
  }).then((res) => {
    if ("password" in res && "userName" in res) {
      if (
        res.password === password &&
        (res.userName === userName || res.email === userName)
      ) {
        session.user = res;
        getUserWorkoutsForDate(
          session.user?.userName,
          new Date(formattedWorkoutDate.value)
        ).then((res) => {
          workoutSession.value = res;
        });
        getFriends(session.user?.userName).then((res) => {
          if (res)
            if (session.user && !("text" in res)) session.user.friends = res;
        });
      } else {
        session.messages.push({
          type: "danger",
          text: "Error fetching userName and password.",
        });
      }
    } else {
      session.messages.push(res);
    }
  });
}

export function editProfile(
  userName: string,
  newUserName: string,
  newEmail: string
) {
  return api<User | Message>(
    `users/edit-profile`,
    {
      userName,
      newUserName,
      newEmail,
    },
    "PATCH"
  ).then((res) => {
    console.log("sent...");
    if ("type" in res && res.type === "danger") session.messages.push(res);
    else if (!("type" in res) && session.user) {
      const friends = session.user.friends;
      session.user = res;
      session.user.friends = friends;
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
    if (res.text === "Friend successfully added") {
      getUser(friendName).then((res) => {
        if (session.user && "userName" in res) session.user.friends.push(res);
      });
    }
    return res;
  });
}

export function getFriends(userName: string) {
  return api<User[] | Message>(`users/${userName}/friends`).then((res) => {
    if ("type" in res && res.type === "danger") session.messages.push(res);
    else return res;
  });
}
