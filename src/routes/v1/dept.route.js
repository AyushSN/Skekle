const express = require('express');
const validate = require('../../middlewares/validate');
const deptValidation = require('../../validations/dept.validation');
const deptController = require('../../controllers/dept.controller');

const router = express.Router();

router
    .route('/')
    .post(validate(deptValidation.createDept), deptController.createDept);

router
    .route('/:deptId')
    .get(validate(deptValidation.getDept), deptController.getDeptById)
    .patch(validate(deptValidation.updateDept), deptController.updateDeptById)
    .delete(validate(deptValidation.deleteDept), deptController.deleteDeptById);

module.exports = router;
