const TokenMetrics = require('../models/tokenMetric.model');

const logTokenUsage = (req, res, next) => {
  // Extract token and IP address from request
  const { token, user } = req;
  if (!token) {
    return next();
  }
  const { method, originalUrl, ip } = req;
  // Exclude '/auth' endpoints from token usage logging
  if (!originalUrl.startsWith('/auth')) {
    const endpoint = `${method} ${originalUrl}`;
    // Create new TokenMetrics document
    const tokenMetrics = new TokenMetrics({
      token,
      endpoint,
      method,
      ip,
      userId: user._id,
    });
    // Save token usage metrics to MongoDB
    tokenMetrics.save()
      .then(() => {
        next(); // Continue to the next middleware or route handler
      })
      .catch((error) => {
        console.error('Error logging token usage:', error);
        next(error); // Pass the error to the error handler middleware
      });
  } else {
    next(); // Skip logging for '/auth' endpoints
  }
};

module.exports = logTokenUsage;
