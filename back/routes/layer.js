import express from 'express';
// import conf from './conf';

const router = express.Router();

const logger = require('./logger');

logger.accessLog.info(`Request API to use ${new Date().toISOString()}`);


/* Select All */


export default router;
