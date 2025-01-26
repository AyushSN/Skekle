const { version } = require('../../package.json');
const config = require('../config/config');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'NodeJs Skeleton',
    version,
  },
  servers: [
    {
      url: `https://localhost:${config.port}/v1`,
    },
  ],
};

module.exports = swaggerDef;
