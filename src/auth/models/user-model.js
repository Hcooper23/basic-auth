'use strict';
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

const saltRounds = 10; // Define the number of salt rounds for password hashing

const Users = Sequelize.define('users', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

Users.beforeCreate((user) => {
  user.password = bcrypt.hashSync(user.password, saltRounds);
});

Users.prototype.authenticate = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = Users;