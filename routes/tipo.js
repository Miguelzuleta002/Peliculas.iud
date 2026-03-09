const express = require('express');
const router = express.Router();
const tipoController = require('../controllers/tipoController');

// Rutas para gestionar los tipos de multimedia
router.get('/', tipoController.obtenerTipos);
router.post('/', tipoController.crearTipo);
router.put('/:id', tipoController.actualizarTipo);
router.delete('/:id', tipoController.eliminarTipo);

module.exports = router;