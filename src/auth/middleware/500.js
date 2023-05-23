// 500 middleware to handle internal server errors
const handle500 = (error, req, res, next) => {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  };
  
  // Export the 500 middleware
  module.exports = handle500;