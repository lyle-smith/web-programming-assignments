const { Collection } = require("mongodb");
const { connect } = require("./mongo");
const { ObjectId } = require("mongodb");
const { getUserId, getFriends } = require("./users");
const { addExercise } = require("./exercises");

const COLLECTION_NAME = "workoutsessions";

async function collection() {
  const client = await connect();
  return client.db("special").collection(COLLECTION_NAME);
}

async function getUserWorkouts(userName) {
  const userId = await getUserId(userName);

  if("text" in userId && "type" in userId)
    return userId;

  const workouts = await collection();
  const userWorkouts = await workouts.find({ userId }).toArray();
  return userWorkouts;
}

async function getSocialWorkouts(userName) {
  const userWorkouts = await getUserWorkouts(userName);
  const friends = await getFriends(userName);
  let socialWorkouts = [];
  socialWorkouts = socialWorkouts.concat(userWorkouts);
  if(!("text" in friends) && !("type" in friends)) {
    for(let i = 0; i < friends.length; i++) {
      const friendWorkouts = await getUserWorkouts(friends[i].userName);
      if(!("text" in friendWorkouts) && friendWorkouts.length > 0){
        socialWorkouts = socialWorkouts.concat(friendWorkouts);
      }
    }
  }
  
  return socialWorkouts;
}

async function getUserWorkoutsForDate(userName, date) {
  const userId = await getUserId(userName);

  if("text" in userId && "type" in userId)
    return userId;

  const workouts = await collection();
  const userWorkouts = await workouts.find({ userId, date }).toArray();
  return userWorkouts;
}

async function addWorkout(userName, trainingType, exerciseQuantity, date) {
  const userId = await getUserId(userName);

  if("text" in userId && "type" in userId)
    return userId;

  const workouts = await collection();

  const workout = {
    userId,
    date,
    trainingType,
  };

  await workouts.insertOne(workout);
  return workout;
}

module.exports = {
  addWorkout,
  getUserWorkoutsForDate,
  getUserWorkouts,
  getSocialWorkouts,
};