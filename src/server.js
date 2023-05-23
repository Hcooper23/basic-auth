const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const handle404 = require('./middleware/404');
const handle500 = require('./middleware/500');
const authRouter = require('./auth/router');
const { sequelize } = require('./auth/models');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

app.use(authRouter);

app.use(handle404);
app.use(handle500);

const start = (port) => {
  sequelize.sync().then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  });
};

module.exports = {
  app,
  start,
};