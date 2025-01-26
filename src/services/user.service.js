const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const { User, City, Dept } = require('../models');
const ApiError = require('../utils/ApiError');
const { validateParameters } = require('../middlewares/parameterCheck');
// const { createCity } = require('../services/city.service.js');

/**
 * Create an admin
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createAdmin = async (userBody) => {
  const requiredParameters = ['name', 'email', 'password'];
  validateParameters(userBody, requiredParameters);
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  const encryptedPassword = await bcrypt.hash(userBody.password, 8);
  const response = {
    data: { ...userBody },
    document : {
      ...userBody,
      role: 'admin',
      password: encryptedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
      __v: 0
    },
  };
  return response;
};

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  if (typeof userBody.city === 'string') {
    let city = await City.findOne({ name: userBody.city });
    console.log(city);
    if (!city) {
      city = await City.create({ name: userBody.city });
    }
    userBody.city = city._id; 
  }

  // Handle department
  if (typeof userBody.dept === 'string') {
    let dept = await Dept.findOne({ name: userBody.dept });
    if (!dept) {
      dept = await Dept.create({ name: userBody.dept });
    }
    userBody.dept = dept._id; 
  }
  return User.create(userBody);
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (aggregate, options) => {
  const users = await User.paginate(aggregate, options);
  return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return User.findById(id).populate('city', 'name').populate('dept', 'name');
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ email }).populate('city', 'name').populate('dept', 'name');
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.remove();
  return user;
};

module.exports = {
  createAdmin,
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
};
