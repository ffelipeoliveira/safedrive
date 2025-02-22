const express = require('express');
const router = express.Router();
const seguroController = require('../controllers/seguroController');

// Rotas para segurados
router.post('/segurados', seguroController.cadastrarSegurado);
router.get('/segurados/:endereco', seguroController.consultarSegurado);
router.post('/segurados/:idApolice/sinistro', seguroController.registrarSinistro);

// Rotas para apolices
router.post('/apolices', seguroController.criarApolice);
router.get('/apolice/:idApolice', seguroController.consultarApoliceBase);
router.get('/apolice-status/:idApolice', seguroController.consultarApoliceStatus);
router.post('/apolices/:idApolice/pagamento', seguroController.pagarPremio);
router.post('/sinistro/:idSinistro/processar', seguroController.processarEPagarSinistro);

router.get('/getBalance', seguroController.saldoContrato);

module.exports = router;