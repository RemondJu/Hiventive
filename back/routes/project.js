import express from 'express';
import conf from './conf';

const router = express.Router();

const logger = require('./logger');

logger.accessLog.info(`Request API to use ${new Date().toISOString()}`);


/* Select All */
/* GET select all projects */
router.get('/', (req, res) => {
  conf.query('SELECT * FROM Project', (err, result) => {
    if (err) {
      logger.errorLog.error(err);
    } else {
      res.json(result);
    }
  });
});

/* Create nex Project */
/* Post new Project */
router.post('/projects', (req, res) => {
  conf.query('INSERT INTO Project SET ? ', req.body, (err) => {
    if (err) {
      logger.errorLog.error(err);
    } else {
      res.sendStatus(201);
    }
  });
});

export default router;
