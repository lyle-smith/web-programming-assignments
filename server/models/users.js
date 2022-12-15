const { Collection } = require("mongodb");
const { connect } = require("./mongo");
const { ObjectId } = require("mongodb");
const _ = require("lodash");
const { findIdInArray } = require("../tools/helpers");

const COLLECTION_NAME = "users";

async function collection() {
  const client = await connect();
  return client.db("special").collection(COLLECTION_NAME);
}

async function searchUsers(query) {
  const users = await collection();
  const data = await users.find({ userName: { $regex: query, $options: 'i' } }).toArray();
  return data;
}

async function getUsers() {
  const users = await collection();
  const data = await users.find().toArray();
  return data;
}

async function getUser(userName) {
  const users = await collection();
  let user;
  if(userName.includes("@"))
    user = await users.findOne({ email: userName });
  else
    user = await users.findOne({ userName });
  
  console.log(user);

  if(!user) {
    let message = {
      text: "User does not exist",
      type: "danger",
    }
    return message;
  }
  return user;
}

async function getUserById(userId) {
  const users = await collection();
  const user = await users.findOne({ _id: new ObjectId(userId) });
  if(!user) {
    let message = {
      text: "User does not exist",
      type: "danger",
    }
    return message;
  }
  return user;
}

async function authenticate(userName, password) {
  console.log("Before getUser");
  const user = await getUser(userName);
  console.log("After getUser");
  if (user && "password" in user && "userName" in user) {
    if (user.password === password && (user.userName === userName || user.email === userName)) {
      return user; 
    }
  }
  let message = {
    text: "Invalid username or password",
    type: "danger",
  }
  return message;
}

async function createUser(data) {
  const users = await collection();
  const existingUserName = await users.findOne({ userName: data.userName });
  const existingEmail = await users.findOne({ email: data.email })
  let message = {
    text: "",
    type: "",
  }
  if (existingUserName) {
    message.text = "Error! Username already exists";
    message.type = "danger";
    return message;
  }
  if (existingEmail) {
    message.text = "Error! Email already exists";
    message.type = "danger";
    return message;
  }
  const user = {
    userName: data.userName.toLowerCase(),
    password: data.password,
    email: data.email.toLowerCase(),
    isAdmin: false,
    profilePicture: "../assets/user-placeholder.png",
    friends: [],
    friendRequests: [],
  }
  await users.insertOne(user);
  message.text = "Account successfully created!";
  message.type = "success";
  return message;
  
}

async function createAdmin(data) {
  const users = await collection();
  const existingUser = await users.findOne({ userName: data.userName });
  let message = {
    text: "",
    type: "",
  }
  if (existingUser) {
    message.text = "Error! Username already exists";
    message.type = "danger";
    return message;
  } else {

    const user = {
      userName: data.userName.toLowerCase(),
      password: data.password,
      email: data.email.toLowerCase(),
      isAdmin: true,
      profilePicture: "../../client/src/assets/profilePicture.jpg",
      friends: [],
      friendRequests: [],
    }
    await users.insertOne(user);
    message.text = "Account successfully created!";
    message.type = "success";
    return message;
  }
}

async function updateProfile(userData) {
  const user = await getUser(userData.userName);
  if("text" in user && "type" in user)
    return user;
  
  user.userName = userData.newUserName.toLowerCase();
  user.email = userData.newEmail.toLowerCase();

  const users = await collection();
  await users.updateOne({ _id: new ObjectId(user._id) }, { $set: user });
  return user;
}

async function deleteUser(userName) {
  const users = await collection();
  const existingUser = await users.findOne({ userName });
  let message = {
    text: "",
    type: "",
  }
  if (!existingUser) {
    message.text = "Error! User does not exist!";
    message.type = "danger";
    return message;
  } else {
    await users.deleteOne({ userName });
    return existingUser;
  }
}

async function getUserId(userName) {
  const user = await getUser(userName);
  if("text" in user && "type" in user)
    return user;
  const userId = user._id;
  return userId;
}

async function sendFriendRequest(senderName, friendName) {
  const users = await collection();
  const user = await getUser(senderName);
  if("text" in user && "type" in user)
    return user;

  const friend = await getUser(friendName);
  if(("text" in friend && "type" in friend))
    return friend;

  if (findIdInArray(user.friends, friend._id) && findIdInArray(friend.friends, user._id)) {
    return {
      text: "Error! User is already a friend",
      type: "danger",
    }
  }

  if(findIdInArray(friend.friendRequests, user._id)) {
    return {
      text: "Error! Friend request already sent",
      type: "danger",
    }
  }

  if (findIdInArray(user.friendRequests, friend._id)) {
    while (findIdInArray(user.friendRequests, friend._id)){
      user.friendRequests.splice(user.friendRequests.indexOf(friend._id), 1);
    }
    user.friends.push(friend._id);
    await users.updateOne({ _id: new ObjectId(user._id) }, { $set: user });
    if(!findIdInArray(friend.friends, user._id))
      friend.friends.push(user._id);
    await users.updateOne({ _id: new ObjectId(friend._id) }, { $set: friend });
    return {
      text: "Friend successfully added",
      type: "success",
    }
  }

  friend.friendRequests.push(user._id);
  await users.updateOne({ _id: new ObjectId(friend._id) }, { $set: friend });
  return {
    text: "Friend request sent",
    type: "success",
  }
}

async function getFriends(userName) {
  const users = await collection();
  const user = await getUser(userName);
  if("text" in user && "type" in user)
    return user;
  const friends = await users.find({ _id: { $in: user.friends } }).toArray();
  return friends;
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  authenticate,
  getUserId,
  createAdmin,
  sendFriendRequest,
  getFriends,
  updateProfile,
  searchUsers,
};