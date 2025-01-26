const Joi = require('joi');


const sendVerification = {
    body: Joi.object().keys({
        email: Joi.string().required().email(),
    }),
};

const verifyEmail = {
    query: Joi.object().keys({
        token: Joi.string().required(),
    }),
};

module.exports = {
    sendVerification,
    verifyEmail,
};
