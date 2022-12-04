const express = require('express');
const users = require('../models/users');

const app = express.Router();

app.
  get('/', (req, res, next) => {
    users.getUsers()
    .then((x) => res.status(200).send(x))
    .catch(next);
  })
  .get('/:username', (req, res, next) => {
    users.getUser(req.params.username)
    .then((x) => res.status(200).send(x))
    .catch(next);
  })
  .post('/:username', (req, res, next) => {
    users.addUser(req.body)
    .then((x) => res.status(200).send(x))
    .catch(next);
  })
  .delete('/:username', (req, res, next) => {
    users.deleteUser(req.params.username)
    .then((x) => res.status(200).send(x))
    .catch(next);
  });


module.exports = app;