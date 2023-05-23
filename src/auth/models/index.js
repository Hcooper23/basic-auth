// Import necessary modules and dependencies
const Sequelize = require('sequelize');

// Initialize your Sequelize instance
const sequelize = new Sequelize({
  // Add your database connection details here based on your config/config.json file
  dialect: 'postgres',
  host: 'your_host',
  username: 'your_username',
  password: 'your_password',
  database: 'your_database_name',
});

// Load the users model
const Users = require('./users-model');

// Define associations, if any

// Export the models
module.exports = {
  Users,
  // Add other models here if you have more
};