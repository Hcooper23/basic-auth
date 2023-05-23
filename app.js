'use strict';

// 3rd Party Resources
require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const { Sequelize, DataTypes } = require('sequelize');

// Prepare the express app
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Process JSON input and put the data on req.body
app.use(express.json());

app.post('/users', (req, res) => {
  const user = req.body;
  // Handle the user data as needed
});

const sequelize = new Sequelize(process.env.DATABASE_URL);

// Process FORM input and put the data on req.body
app.use(express.urlencoded({ extended: true }));

app.post('/submit', (req, res) => {
  const formData = req.body;
  // Handle the form data as needed
});

// Create a Sequelize model
const Users = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Users.create({
  username: 'john_doe',
  password: 'password123',
})
  .then(user => {
    console.log('User created:', user);
  })
  .catch(error => {
    console.error('Error creating user:', error);
  });

// Signup Route -- create a new user
// Two ways to test this route with httpie
// echo '{"username":"john","password":"foo"}' | http post :3000/signup
// http post :3000/signup username=john password=foo
app.post('/signup', async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const record = await Users.create(req.body);
    res.status(200).json(record);
  } catch (e) {
    res.status(403).send('Error Creating User');
  }
});

// Signin Route -- login with username and password
// test with httpie
// http post :3000/signin -a john:foo
app.post('/signin', async (req, res) => {
  try {
    const basicHeaderParts = req.headers.authorization.split(' '); // ['Basic', 'am9objpmb28=']
    const encodedString = basicHeaderParts.pop(); // am9objpmb28=
    const decodedString = base64.decode(encodedString); // "username:password"
    const [username, password] = decodedString.split(':'); // username, password

    const user = await Users.findOne({ where: { username: username } });
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      res.status(200).json(user);
    } else {
      throw new Error('Invalid User');
    }
  } catch (error) {
    res.status(403).send('Invalid Login');
  }
});

// make sure our tables are created, start up the HTTP server.
sequelize
  .sync()
  .then(() => {
    app.listen(3000, () => console.log('Server up'));
  })
  .catch(e => {
    console.error('Could not start server:', e.message);
  });