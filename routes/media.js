const express = require('express');
const router = express.Router();
const mediaController = require('../controllers/mediaController');

// Rutas para gestionar las películas y series
router.get('/', mediaController.obtenerMedias);
router.get('/:id', mediaController.obtenerMediaPorId);
router.post('/', mediaController.crearMedia);
router.put('/:id', mediaController.actualizarMedia);
router.delete('/:id', mediaController.eliminarMedia);

module.exports = router;