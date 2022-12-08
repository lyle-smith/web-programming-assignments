const express = require('express');
const exercises = require('../models/exercises');

const app = express.Router();

app.
  post('/add-exercise', (req, res, next) => {
    exercises.addExercise(req.body.userName, req.body.workoutId)
    .then((x) => res.status(200).send(x))
    .catch(next);
  })
  .get('/:workoutId', (req, res, next) => {
    exercises.getExercisesForWorkout(req.params.workoutId)
    .then((x) => res.status(200).send(x))
    .catch(next);
  });



module.exports = app;