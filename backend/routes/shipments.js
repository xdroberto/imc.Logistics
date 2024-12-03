const express = require('express');
const router = express.Router();
const shipmentController = require('../controllers/shipmentController');
const auth = require('../middleware/auth');
const { isAdmin } = require('../middleware/roleCheck');

// Obtener todos los envíos (solo admin)
router.get('/', auth, isAdmin, shipmentController.getAllShipments);

// Obtener un envío específico
router.get('/:id', auth, shipmentController.getShipmentById);

// Crear un nuevo envío
router.post('/', auth, shipmentController.createShipment);

// Actualizar el estado de un envío (solo admin)
router.patch('/:id/status', auth, isAdmin, shipmentController.updateShipmentStatus);

module.exports = router;

