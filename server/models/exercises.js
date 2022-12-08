const { Collection } = require("mongodb");
const { connect } = require("./mongo");
const { ObjectId } = require("mongodb");
const { getUserId } = require("./users");

const COLLECTION_NAME = "exercises";

async function collection() {
  const client = await connect();
  return client.db("special").collection(COLLECTION_NAME);
}

async function addExercise(userName, workoutId) {
  const userId = await getUserId(userName);
  const workoutObjId = new ObjectId(workoutId);

  if("text" in userId && "type" in userId)
    return userId;

  const exercises = await collection();

  const exercise = {
    userId,
    workoutId: workoutObjId,
    name: "Bench Press",
    weight: 0,
    sets: 0,
    reps: 0,
    rpe: 1,
  }

  await exercises.insertOne(exercise);
  return exercise;
}

async function getExercisesForWorkout(workoutId) {
  const workoutObjId = new ObjectId(workoutId);
  const exercises = await collection();
  const workoutExercises = await exercises.find({ workoutId: workoutObjId }).toArray();
  return workoutExercises;
}

module.exports = {
  addExercise,
  getExercisesForWorkout,
};