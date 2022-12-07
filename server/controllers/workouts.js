const express = require('express');
const workouts = require('../models/workouts');

const app = express.Router();

app.
  post('/add-workout', (req, res, next) => {
    workouts.addWorkout(req.body.userName, req.body.trainingType, req.body.exerciseQuantity, req.body.date)
    .then((x) => res.status(200).send(x))
    .catch(next);
  })
  .post('/date-workouts', (req, res, next) => {
    workouts.getUserWorkoutsForDate(req.body.userName, req.body.date)
    .then((x) => res.status(200).send(x))
    .catch(next)
  });



module.exports = app;