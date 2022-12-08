const { Collection } = require("mongodb");
const { connect } = require("./mongo");
const { ObjectId } = require("mongodb");

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

  if(!user) {
    let message = {
      text: "User does not exist",
      type: "danger",
    }
    return message;
  }
  const userId = user._id;
  return userId;
}


module.exports = {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  authenticate,
  getUserId,
  createAdmin,
};