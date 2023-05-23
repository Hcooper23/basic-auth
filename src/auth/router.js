'use strict';

const express = require('express');
const basicAuth = require('./middleware/basic');
const { Users } = require('./models');

const router = express.Router();

router.post('/signup', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await Users.create({ username, password });

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

router.post('/signin', basicAuth, async (req, res, next) => {
  try {
    const user = req.user;

    res.status(200).json(user);
  } catch (error) {
    next(new Error('Invalid Login'));
  }
});

module.exports = router;