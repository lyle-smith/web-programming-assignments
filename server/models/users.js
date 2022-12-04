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
  const data = await users.findOne({ userName });
  return data;
}

async function addUser(data) {
  const users = await collection();
  const existingUser = await users.findOne({ username: data.username });
  if (existingUser) {
    throw {
      httpCode: 400,
      message: "UserName already exists",
    };
  } else {
    const user = {
      firstName: data.firstName,
      lastName: data.lastName,
      userName: data.userName,
      password: data.password,
      email: data.email,
      isAdmin: data.isAdmin,
      profilePicture: data.profilePicture,
      workoutHistory: data.workoutHistory,
    }
    await users.insertOne(user);
  }
}

async function deleteUser(userName) {
  const users = await collection();
  const existingUser = await users.findOne({ userName });
  if (!existingUser) {
    throw {
      httpCode: 400,
      message: "User does not exist",
    };
  } else {
    await users.deleteOne({ userName });
    return existingUser;
  }
}


module.exports = {
  getUsers,
  getUser,
  addUser,
  deleteUser,
};