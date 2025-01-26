const rateLimit = require('express-rate-limit');

// to limit 600 requests per minute
const authLimiter = rateLimit({
  windowMs: process.env.WINDOW_MS,
  max: process.env.MAX_REQUESTS,
  skipSuccessfulRequests: false,
});

module.exports = {
  authLimiter,
};
