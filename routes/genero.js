const express = require('express');
const router = express.Router();

// Importamos a nuestro "gerente" (el controlador) que ya tiene la lógica
const generoController = require('../controllers/generoController');

// 1. Petición GET: Para consultar o listar los géneros
router.get('/', generoController.obtenerGeneros);

// 2. Petición POST: Para registrar un nuevo género
router.post('/', generoController.crearGenero);

// 3. Petición PUT: Para editar un género existente (requiere un ID)
router.put('/:id', generoController.actualizarGenero);

// 4. Petición DELETE: Para borrar o inactivar un género (requiere un ID)
router.delete('/:id', generoController.eliminarGenero);

// Exportamos las rutas para que el servidor (index.js) las reconozca
module.exports = router;