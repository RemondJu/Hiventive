import express from 'express';
import conf from './conf';

const router = express.Router();

const logger = require('./logger');

logger.accessLog.info(`Request API to use ${new Date().toISOString()}`);

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

/* GET select all projects */
router.get('/projects', (req, res) => {
  conf.query('SELECT * FROM Project', (err, result) => {
    if (err) {
      logger.errorLog.error(err);
    } else {
      res.json(result);
    }
  });
});


/* GET select all layers */
router.get('/layers', (req, res) => {
  conf.query('SELECT Layer.id, Layer.name, Layer.description, Layer.hostSite, Layer.share, LayerType.type FROM Layer LEFT JOIN LayerType ON Layer.layerTypeID = LayerType.id ORDER BY Layer.name', (err, result) => {
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
      res.sendStatus(200);
    }
  });
});

/* GET search layer */
router.get('/layer/search/', (req, res) => {
  conf.query(`SELECT Layer.id, Layer.name, Layer.description, Layer.hostSite, LayerType.type, Layer.share FROM Layer LEFT JOIN LayerType ON Layer.layerTypeID = LayerType.id WHERE name LIKE '%${req.query.wordSearch}%' OR description LIKE '%${req.query.wordSearch}%' ORDER BY Layer.name`, (err, result) => {
    if (err) {
      logger.errorLog.error(err);
    } else {
      res.json(result);
    }
  });
});
router.post('/project', (req, res) => {
  conf.query('INSERT INTO Project SET ? ', req.body, (err) => {
    if (err) {
      logger.errorLog.error(err);
    } else {
      res.sendStatus(201);
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

/* Post new project-layer */
router.post('/project-layer', (req, res) => {
  conf.query('INSERT INTO ProjectLayer SET ? ', req.body, (err) => {
    if (err) {
      logger.errorLog.error(err);
    } else {
      res.sendStatus(201);
    }
  });
});


/* Delete layer by id from project */
router.delete('/project-layer/:id', (req, res) => {
  conf.query('DELETE FROM `ProjectLayer` WHERE `layerId`= ?', req.params.id, (err) => {
    if (err) {
      logger.errorLog.error(err);
    } else {
      res.sendStatus(204);
    }
  });
});

router.delete('/delete-project/:id', (req, res) => {
  conf.query('DELETE FROM `Project` WHERE id = ?', req.params.id, (err) => {
    if (err) {
      logger.errorLog.error(err);
    } else {
      res.sendStatus(204);
    }
  });
});

/* Get layer by id */
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
  const request = 'SELECT Layer.description, Layer.name AS layerName, Layer.downloadsCounter, Layer.hostSite, Layer.id, Layer.imported, Layer.url, Layer.version, Layer.viewsCounter, Layer.share, LayerType.type, User.name AS userName, LayerType.id AS typeID FROM Layer LEFT JOIN LayerType ON Layer.layerTypeID = LayerType.id LEFT JOIN User ON Layer.userID = User.id WHERE Layer.id = ?';
  conf.query(request, idLayer, (err, result) => {
    if (err) {
      logger.errorLog.error(err);
    } else {
      res.json(result[0]);
    }
  });
});

router.get('/layers-from-project/:id', (req, res) => {
  const projectId = req.params.id;
  conf.query('SELECT `Layer`.`id`, `Layer`.`name`,`Layer`.`url`,`Layer`.`description`,`Layer`.`hostSite`, `Layer`.`share` FROM `Layer` LEFT JOIN `ProjectLayer` ON `Layer`.id = `ProjectLayer`.`layerId` WHERE `ProjectLayer`.`projectId` = ?', projectId, (err, result) => {
    if (err) {
      logger.errorLog.error(err);
    } else {
      res.json(result);
    }
  });
});

/* Get layer all-projects, all-view, all-download and all-contributors */
router.get('/community/', (req, res) => {
  conf.query('SELECT SUM(DISTINCT Layer.downloadsCounter) AS allDownload, SUM(DISTINCT Layer.viewsCounter) AS allView, COUNT(DISTINCT User.email) AS contributors, COUNT(DISTINCT Project.name) AS projects FROM Layer, User, Project', (err, result) => {
    if (err) {
      logger.errorLog.error(err);
    } else {
      res.json(result[0]);
    }
  });
});


/* PUT a layer view by ID */
router.put('/layer-view-counter/:id', (req, res) => {
  const idLayer = req.params.id;
  conf.query('UPDATE Layer SET viewsCounter = viewsCounter + 1 WHERE id=?', idLayer, (err, result) => {
    if (err) {
      logger.errorLog.error(err);
    } else {
      res.json(result[0]);
    }
  });
});


/* Delete layer by id */
router.delete('/layer/:id', (req, res) => {
  conf.query('DELETE FROM `Layer` WHERE `id`= ?', req.params.id, (err) => {
    if (err) {
      logger.errorLog.error(err);
    } else {
      res.sendStatus(204);
    }
  });
});

/* edit layer by id */
router.put('/layer/:id', (req, res) => {
  conf.query('UPDATE `Layer` SET ? WHERE `id`= ?', [req.body, req.params.id], (err) => {
    if (err) {
      logger.errorLog.error(err);
    } else {
      res.sendStatus(204);
    }
  });
});

router.put('/project/:id', (req, res) => {
  conf.query('UPDATE `Project` SET ? WHERE `id`= ?', [req.body, req.params.id], (err) => {
    if (err) {
      logger.errorLog.error(err);
    } else {
      res.sendStatus(204);
    }
  });
});

/* Get most downloaded layers */
router.get('/mostdownload/', (req, res) => {
  conf.query('SELECT Layer.downloadsCounter AS mostDownload, Layer.id, Layer.name, Layer.viewsCounter AS mostView, User.name AS alias FROM Layer LEFT JOIN User ON Layer.userID = User.id ORDER BY mostDownload DESC LIMIT 3', (err, result) => {
    if (err) {
      logger.errorLog.error(err);
    } else {
      res.json(result);
    }
  });
});

/* Get most views layers */
router.get('/mostview/', (req, res) => {
  conf.query('SELECT Layer.viewsCounter AS mostView, Layer.id, Layer.name, Layer.downloadsCounter AS mostDownload, User.name AS alias FROM Layer LEFT JOIN User ON Layer.userID = User.id ORDER BY mostView DESC LIMIT 3', (err, result) => {
    if (err) {
      logger.errorLog.error(err);
    } else {
      res.json(result);
    }
  });
});

/* get log */
router.get('/login', (req, res) => {
  conf.query('SELECT id, firstname FROM User WHERE firstname=? AND password=?', [req.query.firstname, req.query.password], (err, result) => {
    if (err) {
      logger.errorLog.error(err);
    }
    if (result.length === 0) {
      res.json(0);
    } else {
      res.json(result[0]);
    }
  });
});

export default router;
