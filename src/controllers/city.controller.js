const httpStatus = require('http-status');
const { City } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a city
 * @param {Object} cityBody
 * @returns {Promise<City>}
 */
const createCity = async (req, res) => {
    try {
        const city =  await City.create(req.body);
        return res.status(200).json(city)
    } catch (error) {
        throw new Error(`Error creating city: ${error.message}`);
    }
};

/**
 * Get city by id
 * @param {ObjectId} id
 * @returns {Promise<City>}
 */
const getCityById = async (id) => {
    return City.findById(id);
};

/**
 * Update city by id
 * @param {ObjectId} cityId
 * @param {Object} updateBody
 * @returns {Promise<City>}
 */
const updateCityById = async (req, res) => {
    const city = await getCityById(req.params.cityId);
    if (!city) {
        throw new ApiError(httpStatus.NOT_FOUND, 'City not found');
    }
    Object.assign(city, req.body);
    const newcity=await city.save();
    return res.status(200).json(newcity);
};

/**
 * Delete city by id
 * @param {ObjectId} cityId
 * @returns {Promise<City>}
 */
const deleteCityById = async (req,res) => {
    const city = await getCityById(req.params.cityId);
    if (!city) {
        throw new ApiError(httpStatus.NOT_FOUND, 'City not found');
    }
    const deletedCity=await city.remove();
    return res.status(200).json(deletedCity);
};

module.exports = {
    createCity,
    getCityById,
    updateCityById,
    deleteCityById,
};
