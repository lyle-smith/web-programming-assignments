const express = require('express');
const app = express();

const usersController = require('./controllers/users');
const workoutsController = require('./controllers/workouts');

const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;

// Send header
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// serve client files
app.use('/', express.static('./client/dist'));

app.use(express.json());

app
.get('/', (req, res) => {
  res.status(200).send('Happy New Year!');
})
.use('/api/v1/users/', usersController)
.use('/api/v1/workouts/', workoutsController);

// Let client handle routing
app.get('*', (req, res) => {
  res.sendFile('index.html', { root: './client/dist' });
});

// Error handling
app.use((err, req, res, next) => {
  console.log(err);
  // Need to use .send() or the page will hang
  res.status(err.httpCode ?? 500).send({
    message: err.message ?? 'Internal Server Error',
    status: err.httpCode ?? 500
  }); 
});

app.listen(port, () => {
  console.log(`Server running at ${port}/`);
});
