const httpStatus = require('http-status');
const { Dept } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a dept
 * @param {Object} deptBody
 * @returns {Promise<Dept>}
 */
const createDept = async (req,res) => {
    try {
        const dept =  await Dept.create(req.body);
        return res.status(200).json(dept)
    } catch (error) {
        throw new Error(`Error creating dept: ${error.message}`);
    }
};

/**
 * Get dept by id
 * @param {ObjectId} id
 * @returns {Promise<Dept>}
 */
const getDeptById = async (id) => {
    return Dept.findById(id);
};

/**
 * Update dept by id
 * @param {ObjectId} deptId
 * @param {Object} updateBody
 * @returns {Promise<Dept>}
 */
const updateDeptById = async (req,res) => {
    const dept = await getDeptById(req.params.deptId);
    if (!dept) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Dept not found');
    }
    Object.assign(dept, req.body);
    const newdept=await dept.save();
    return res.status(200).json(newdept);
};

/**
 * Delete dept by id
 * @param {ObjectId} deptId
 * @returns {Promise<Dept>}
 */
const deleteDeptById = async (req,res) => {
    const dept = await getDeptById(req.params.deptId);
    if (!dept) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Dept not found');
    }
    const deletedDept=await dept.remove();
    return res.status(200).json(deletedDept);
};

module.exports = {
    createDept,
    getDeptById,
    updateDeptById,
    deleteDeptById,
};
