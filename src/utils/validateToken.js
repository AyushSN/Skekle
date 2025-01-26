const { Token } = require('../models');

// eslint-disable-next-line import/prefer-default-export
const validateToken = async function (token) {
  // eslint-disable-next-line no-console
  const tokenDoc = await Token.findOne({ token });
  if (!tokenDoc) return false;
  if (tokenDoc.blacklisted) return false;
  return true;
}
module.exports = validateToken;