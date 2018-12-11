import express from 'express';
import conf from './conf';

const router = express.Router();

/* GET select all users */
router.get('/allUsers', (req, res) => {
  conf.query('SELECT * FROM User', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});


/* GET select all projects */
router.get('/allProjects', (req, res) => {
  conf.query('SELECT * FROM Project', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});


/* GET select all layers */
router.get('/allLayers', (req, res) => {
  conf.query('SELECT * FROM Layer', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

export default router;
