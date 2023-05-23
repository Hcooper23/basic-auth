// 404 middleware to handle non-existent routes
const handle404 = (req, res, next) => {
    res.status(404).json({ error: 'Route not found' });
  };
  
  // Export the 404 middleware
  module.exports = handle404;