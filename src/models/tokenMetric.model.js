const mongoose = require('mongoose');

const tokenMetricSchema = mongoose.Schema(
  {
    token: {
      type: String,
      ref: 'Token',
      required: true,
    },
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    endpoint: {
      type: String,
      required: true,
    },
    method: {
      type: String,
      required: true,
    },
    ip: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * @typedef TokenMetric
 */
const TokenMetric = mongoose.model('TokenMetric', tokenMetricSchema);

module.exports = TokenMetric;