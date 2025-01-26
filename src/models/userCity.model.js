const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
//const { roles } = require('../config/roles');

const citySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
},
{
    timestamps: true,
}
);

// add plugin that converts mongoose to json
citySchema.plugin(toJSON);
citySchema.plugin(paginate);

/**
 * @typedef City
 */

citySchema.pre('save', async function (next) {
    const city = this;
    if (city.isModified('name')) {
        city.name = city.name.toUpperCase();
    }
    next();
});

const City = mongoose.model('City', citySchema);

module.exports = City;