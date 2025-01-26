const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

const validateParameters = function (req, requiredParameters) {

  const objectKeys = Object.keys(req?.query || req);
  // eslint-disable-next-line no-restricted-syntax
  for (const field of requiredParameters) {
    if (!objectKeys.includes(field)) {
      throw new ApiError(httpStatus.BAD_REQUEST, `${field} is a required parameter`);
    }
  }
}

module.exports = {
  validateParameters,
};
