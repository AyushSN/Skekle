const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createDept = {
    body: Joi.object().keys({
    name: Joi.string().required(),
    }),
};

const getDept = {
    params: Joi.object().keys({
    deptId: Joi.string().custom(objectId),
    }),
};

const updateDept = {
    params: Joi.object().keys({
    deptId: Joi.required().custom(objectId),
    }),
    body: Joi.object()
    .keys({
        name: Joi.string(),
    })
    .min(1),
};

const deleteDept = {
    params: Joi.object().keys({
    deptId: Joi.string().custom(objectId),
    }),
};

module.exports = {
    createDept,
    getDept,
    updateDept,
    deleteDept,
};
