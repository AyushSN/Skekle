const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createCity = {
    body: Joi.object().keys({
        name: Joi.string().required(),
    }),
};

const getCity = {
    params: Joi.object().keys({
        name: Joi.string().custom(objectId),
    }),
};

const updateCity = {
    params: Joi.object().keys({
    cityId: Joi.required().custom(objectId),
    }),
    body: Joi.object()
    .keys({
        name: Joi.string(),
    })
    .min(1),
};

const deleteCity = {
    params: Joi.object().keys({
    cityId: Joi.string().custom(objectId),
    }),
};

module.exports = {
    createCity,
    getCity,
    updateCity,
    deleteCity,
};
