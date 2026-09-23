const express = require('express');
const {
  createPersonController,
  findPersonController,
  createRelationshipController,
  findConnectionsController
} = require('../controllers/peopleController');
const router = express.Router();

router.post('/', createPersonController);
router.get('/', findPersonController);
router.post('/relationship', createRelationshipController);
router.get('/connections', findConnectionsController);

module.exports = router;