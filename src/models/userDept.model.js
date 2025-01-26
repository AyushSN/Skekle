const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
//const { roles } = require('../config/roles');

const deptSchema = mongoose.Schema({
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
deptSchema.plugin(toJSON);
deptSchema.plugin(paginate);

/**
 * @typedef Dept
 */

deptSchema.pre('save', async function (next) {
    const dept = this;
    if (dept.isModified('name')) {
        dept.name = dept.name.toUpperCase();
    }
    next();
});

const Dept = mongoose.model('Dept', deptSchema);

module.exports = Dept;