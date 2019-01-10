import express from 'express';
import conf from './conf';

const router = express.Router();

const logger = require('./logger');

logger.accessLog.info(`Request API to use ${new Date().toISOString()}`);

/* Select All */
/* GET select all users */
router.get('/users', (req, res) => {
  conf.query('SELECT * FROM User', (err, result) => {
    if (err) {
      logger.errorLog.error(err);
    } else {
      res.json(result);
    }
  });
});

/* GET select all layers */
router.get('/layers', (req, res) => {
  conf.query('SELECT Layer.id, Layer.name, Layer.description, Layer.hostSite, LayerType.type FROM Layer LEFT JOIN LayerType ON Layer.layerTypeID = LayerType.id', (err, result) => {
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

/* Create new */
/* post new layer */
router.post('/layer/', (req, res) => {
  conf.query('INSERT INTO Layer SET ? ', req.body, (err) => {
    if (err) {
      logger.errorLog.error(err);
    } else {
      res.sendStatus(200);
    }
  });
});

/* Post new User */
router.post('/user', (req, res) => {
  conf.query('INSERT INTO User SET ? ', req.body, (err) => {
    if (err) {
      logger.errorLog.error(err);
    } else {
      res.sendStatus(201);
    }
  });
});

/* GET search layer */
router.get('/layer/search/', (req, res) => {
  conf.query(`SELECT Layer.id, Layer.name, Layer.description, Layer.hostSite, LayerType.type FROM Layer LEFT JOIN LayerType ON Layer.layerTypeID = LayerType.id WHERE name LIKE '%${req.query.wordSearch}%' OR description LIKE '%${req.query.wordSearch}%' ORDER BY Layer.viewsCounter DESC LIMIT 20`, (err, result) => {
    if (err) {
      logger.errorLog.error(err);
    } else {
      res.json(result);
    }
  });
});

/* GET projects to user */
router.get('/projects/user/:id', (req, res) => {
  conf.query('SELECT id, description, name FROM Project WHERE userID=?', req.params.id, (err, result) => {
    if (err) {
      logger.errorLog.error(err);
    } else {
      res.json(result);
    }
  });
});

router.post('/project-layer', (req, res) => {
  conf.query('INSERT INTO ProjectLayer SET ? ', req.body, (err) => {
    if (err) {
      logger.errorLog.error(err);
    } else {
      res.sendStatus(201);
    }
  });
});

router.delete('/project-layer/:id', (req, res) => {
  conf.query('DELETE FROM `ProjectLayer` WHERE `layerId`= ?', req.params.id, (err) => {
    if (err) {
      logger.errorLog.error(err);
    } else {
      res.sendStatus(204);
    }
  });
});

router.get('/project-layers/:id/:layerId', (req, res) => {
  conf.query('SELECT `layerId` FROM `ProjectLayer` WHERE `projectId` = ? AND `layerId` = ?', [req.params.id, req.params.layerId], (err, result) => {
    if (err) {
      logger.errorLog.error(err);
    } else {
      res.json(result[0] === undefined ? 'true' : 'false');
    }
  });
});

/* GET layer details by ID */
router.get('/layerdetail/:id', (req, res) => {
  const idLayer = req.params.id;
  const request = 'SELECT Layer.description, Layer.me AS layerName, Layer.downloadsCounter, Layer.hostSite, Layer.id, Layer.imported, Layer.url, Layer.version, Layer.viewsCounter, Layer.share, LayerType.type, User.name AS userName FROM Layer LEFT JOIN LayerType ON Layer.layerTypeID = LayerType.id LEFT JOIN User ON Layer.userID = User.id WHERE Layer.id = ?';
  conf.query(request, idLayer, (err, result) => {
    if (err) {
      if (err.errno === 1054) {
        res.json({});
      }
      logger.errorLog.error(err);
    } else {
      res.json(result[0]);
    }
  });
});

export default router;
