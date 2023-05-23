const handle500 = (error, req, res, next) => {
  console.error(error);
  res.status(500).json({ error: 'Internal server error' });
  next(error);
};

module.exports = handle500;