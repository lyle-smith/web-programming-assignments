const { Collection } = require("mongodb");
const { connect } = require("./mongo");
const { ObjectId } = require("mongodb");
const _ = require("lodash");

const COLLECTION_NAME = "users";

async function collection() {
  const client = await connect();
  return client.db("special").collection(COLLECTION_NAME);
}

async function getUsers() {
  const users = await collection();
  const data = await users.find().toArray();
  return data;
}

async function getUser(userName) {
  const users = await collection();
  const user = await users.findOne({ userName });
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
  const user = await getUser(userName);
  if (user) {
    if ("password" in user && "userName" in user) {
      if (user.password === password && user.userName === userName) 
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
      userName: data.userName,
      password: data.password,
      email: data.email,
      isAdmin: false,
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
      userName: data.userName,
      password: data.password,
      email: data.email,
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

  

  if (_.find(user.friends, friend._id)) {
    return {
      text: "Error! User is already a friend",
      type: "danger",
    }
  }

  if (_.find(user.friendRequests, friend._id)) {
    user.friendRequests.splice(user.friendRequests.indexOf(friend._id), 1);
    user.friends.push(friend._id);
    await users.updateOne({ _id: new ObjectId(user._id) }, { $set: user });
    if(!_.find(friend.friends, user._id))
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
  
  

  
    


module.exports = {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  authenticate,
  getUserId,
  createAdmin,
  sendFriendRequest,
};