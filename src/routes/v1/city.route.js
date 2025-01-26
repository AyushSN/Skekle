const express = require('express');
const validate = require('../../middlewares/validate');
const cityValidation = require('../../validations/city.validation');;
const cityController = require('../../controllers/city.controller');;

const router = express.Router();

router
    .route('/')
    .post(validate(cityValidation.createCity), cityController.createCity);

router
    .route('/:cityId')
    .get(validate(cityValidation.getCity), cityController.getCityById)
    .patch(validate(cityValidation.updateCity), cityController.updateCityById)
    .delete(validate(cityValidation.deleteCity), cityController.deleteCityById);

module.exports = router;
