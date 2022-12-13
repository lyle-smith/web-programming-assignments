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
  .post('/authenticate', (req, res, next) => {
    users.authenticate(req.body.userName, req.body.password)
    .then((x) => res.status(200).send(x))
    .catch(next);
  })
  .post('/create-user', (req, res, next) => {
    users.createUser(req.body)
    .then((x) => res.status(200).send(x))
    .catch(next);
  })
  .post('/create-admin', (req, res, next) => {
    users.createAdmin(req.body)
    .then((x) => res.status(200).send(x))
    .catch(next);
  })
  .delete('/:username', (req, res, next) => {
    users.deleteUser(req.params.username)
    .then((x) => res.status(200).send(x))
    .catch(next);
  })
  .patch('/send-friend-request', (req, res, next) => {
    users.sendFriendRequest(req.body.senderName, req.body.friendName)
    .then((x) => res.status(200).send(x))
    .catch(next);
  })
  .get('/:username/friends', (req, res, next) => {
    users.getFriends(req.params.username)
    .then((x) => res.status(200).send(x))
    .catch(next);
  });


module.exports = app;