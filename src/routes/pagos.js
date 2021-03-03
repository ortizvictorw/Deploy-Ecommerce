const express = require('express');
const router = express.Router();
const exampleController = require('../controllers/example');

// Integración básica
router.post('/generar_preferencia', exampleController.demoCheckout);
router.get('/pago_exitoso', exampleController.successPayment);
router.get('/pago_rechazado', exampleController.failedPayment);


module.exports = router;
