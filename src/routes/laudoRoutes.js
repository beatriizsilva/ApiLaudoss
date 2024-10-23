const express = require('express');
const laudoController = require('../controllers/laudoController');

const router = express.Router();

router.post('/laudos', laudoController.createLaudo);
router.get('/laudos', laudoController.getAllLaudos);
router.get('/laudos/:id', laudoController.getLaudoById);
router.get('/laudos/search', laudoController.searchLaudos);

module.exports = router;
