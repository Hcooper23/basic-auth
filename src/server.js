// Import necessary modules and dependencies
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const handle404 = require('./middleware/404');
const handle500 = require('./middleware/500');
const authRouter = require('./auth/router');
const { sequelize } = require('./auth/models');

// Create the Express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

// Routes
app.use(authRouter);

// 404 and 500 Error Handlers
app.use(handle404);
app.use(handle500);

// Start the server
const start = (port) => {
  sequelize.sync().then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  });
};

// Export the app and start method
module.exports = {
  app,
  start,
};