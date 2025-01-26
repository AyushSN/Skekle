const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { customerService } = require('../services');



const sendVerification = catchAsync(async (req, res) => {
    const user = await customerService.sendVerification(req.body.email,req,res);
    res.status(httpStatus.CREATED).send(user);
  });
  
  const verifyEmail = catchAsync(async (req, res) => {
    const user = await customerService.verifyEmail(req.query.token,req,res);
    res.status(httpStatus.CREATED).send(user);
  });

module.exports = {
    sendVerification,
    verifyEmail
};