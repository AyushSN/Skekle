// const { City } = require('../models');
// const httpStatus = require('http-status');
// const ApiError = require('../utils/ApiError');

// /**
//  * Create a city
//  * @param {Object} cityBody
//  * @returns {Promise<City>}
//  */
// const createCity = async (cityBody) => {
//     const { name, ...cityData } = cityBody;

//     // Check if the city already exists
//     let city = await City.findOne({ name });

//     // If city exists, assign its _id to cityBody
//     if (city) {
//         cityData._id = city._id;
//     } else {
//         // If city does not exist, create a new city with a new ObjectId
//         city = await City.create({ name, ...cityData });
//     }

//     return city;
// };

// module.exports = {
//     createCity,
// };
