const { Collection } = require("mongodb");
const { connect } = require("./mongo");
const { ObjectId } = require("mongodb");
const { getUser } = require("./users");

const COLLECTION_NAME = "workoutsessions";

async function collection() {
  const client = await connect();
  return client.db("special").collection(COLLECTION_NAME);
}

async function getUserId(userName) {
  const user = await getUser(userName);
  let message = {
    text: "",
    type: "",
  }

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

  const exercise = {
    name: "Bench Press",
    weight: 0,
    sets: 0,
    reps: 0,
    rpe: 1,
  }

  const initialExerciseList = [];
  for (let i = 0; i < exerciseQuantity; i++) {
    initialExerciseList.push(exercise);
  }

  const workout = {
    userId,
    date,
    trainingType,
    exercises: initialExerciseList,
  };

  await workouts.insertOne(workout);
  return workout;
}

module.exports = {
  addWorkout,
  getUserWorkoutsForDate,
};