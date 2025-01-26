const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const customerValidation = require('../../validations/customer.validation');
const customerController = require('../../controllers/customer.controller');

const router = express.Router();


router
  .route('/send-verification')
  .post(auth('manageCustomers'),validate(customerValidation.sendVerification), customerController.sendVerification);
router
  .route('/verify')
  .get(auth('manageCustomers'),validate(customerValidation.verifyEmail), customerController.verifyEmail);


module.exports = router;