import express from 'express';
import conf from './conf';

const router = express.Router();

const logger = require('./logger');

logger.accessLog.info(`Request API to use ${new Date().toISOString()}`);

/* GET select all users */
router.get('/all-users', (req, res) => {
  conf.query('SELECT * FROM User', (err, result) => {
    if (err) {
      logger.errorLog.error(err);
    } else {
      res.json(result);
    }
  });
});


/* GET select all projects */
router.get('/all-projects', (req, res) => {
  conf.query('SELECT * FROM Project', (err, result) => {
    if (err) {
      logger.errorLog.error(err);
    } else {
      res.json(result);
    }
  });
});


/* GET select all layers */
router.get('/all-layers', (req, res) => {
  conf.query('SELECT * FROM Layer', (err, result) => {
    if (err) {
      logger.errorLog.error(err);
    } else {
      res.json(result);
    }
  });
});

/* GET select all categories */
router.get('/layer/categories', (req, res) => {
  conf.query('SELECT id, type FROM LayerType', (err, result) => {
    if (err) {
      logger.errorLog.error(err);
    } else {
      res.json(result);
    }
  });
});

/* post new layer */
router.post('/layer/', (req, res) => {
  conf.query('INSERT INTO Layer SET ? ', req.body, (err) => {
    if (err) {
      logger.errorLog.error(err);
    } else {
      conf.query('INSERT IGNORE INTO ProjectLayer SET projectId = ?, layerId= (SELECT id FROM Layer WHERE id =LAST_INSERT_ID()); ', req.query.projectId, (errB) => {
        if (errB) {
          logger.errorLog.error(err);
        } else {
          res.sendStatus(200);
        }
      });
    }
  });
});

export default router;
