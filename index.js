'use strict';

require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.use(express.json());

app.post('/users', (req, res) => {
  const user = req.body;
});

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'postgres',
});

app.use(express.urlencoded({ extended: true }));

app.post('/submit', (req, res) => {
  const formData = req.body;
});

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

app.post('/signup', async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const record = await Users.create(req.body);
    res.status(200).json(record);
  } catch (e) {
    res.status(403).send('Error Creating User');
  }
});

app.post('/signin', async (req, res) => {
  try {
    const basicHeaderParts = req.headers.authorization.split(' ');
    const encodedString = basicHeaderParts.pop();
    const decodedString = base64.decode(encodedString);
    const [username, password] = decodedString.split(':');

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

sequelize
  .sync()
  .then(() => {
    app.listen(3000, () => console.log('Server up'));
  })
  .catch(e => {
    console.error('Could not start server:', e.message);
  });