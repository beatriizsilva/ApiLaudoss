// const express = require('express');
// const laudoController = require('../controllers/laudoController');

// const router = express.Router();

// router.post('/laudos', laudoController.createLaudo);
// router.get('/laudos/:id', laudoController.getLaudoById);
// router.get('/laudos', laudoController.searchLaudos);

// module.exports = router;
const express = require('express');
const laudoController = require('../controllers/laudoController');

const router = express.Router();

// Rota para listar todos os laudos ou buscar com `t`
router.get('/laudos', laudoController.searchOrListLaudos);

router.post('/laudos', laudoController.createLaudo);  // Criar laudo
router.get('/laudos/:id', laudoController.getLaudoById);  // Buscar laudo por ID

module.exports = router;




