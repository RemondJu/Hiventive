const winston = require('winston');

const path = require('path');

const logPath = __dirname;

const errorLog = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: path.join(logPath, 'errors.log'),
      timestamp: new Date().toISOString(),
      level: 'info'
    })
  ]
});

const accessLog = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: path.join(logPath, 'access.log'),
      timestamp: new Date().toISOString(),
      level: 'info'
    })
  ]
});


module.exports = {
  errorLog,
  accessLog,
};
