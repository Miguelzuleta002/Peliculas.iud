const express = require('express');
const router = express.Router();
const directorController = require('../controllers/directorController');

// Rutas para gestionar los directores
router.get('/', directorController.obtenerDirectores);
router.post('/', directorController.crearDirector);
router.put('/:id', directorController.actualizarDirector);
router.delete('/:id', directorController.eliminarDirector);

module.exports = router;