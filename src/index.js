const mongoose = require('mongoose');
const path = require('path');
const https = require('https');
const fs = require('fs');
const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');

let server;

// Load SSL/TLS certificates
// eslint-disable-next-line security/detect-non-literal-fs-filename
const privateKey = fs.readFileSync(path.join(__dirname, 'cert', 'key.pem'), 'utf8');
// eslint-disable-next-line security/detect-non-literal-fs-filename
const certificate = fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'), 'utf8');

const credentials = {
  key: privateKey,
  cert: certificate,
};

// Create HTTPS server
const httpsServer = https.createServer(credentials, app);

mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info('Connected to MongoDB');
  // server = app.listen(config.port, () => {
  //   logger.info(`Listening to port ${config.port}`);
  // });
  server = httpsServer.listen(config.port, () => {
    // eslint-disable-next-line no-console
    console.log(`HTTPS Server running on port ${config.port}`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
