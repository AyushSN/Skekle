const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService} = require('../services');

const createAdmin = catchAsync(async (req, res) => {
  const user = await userService.createAdmin(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const matchParameters = pick(req.query, ['name', 'organization', 'role']);
  const aggregate = {
    aggPipeline: [
      {
        $match: {
          ...matchParameters,
        },
      },
    ],
    aggOptions: {
      allowDiskUse: false,
    },
  };
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(aggregate, options);
  // res.send(req);
  res.send(result);
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});




module.exports = {
  createAdmin,
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser
};
