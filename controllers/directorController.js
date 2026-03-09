// directorController.js
const Director = require('../models/Director');

exports.crearDirector = async (req, res) => {
    try {
        const nuevoDirector = new Director(req.body);
        await nuevoDirector.save();
        res.status(201).json(nuevoDirector);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear el director', error });
    }
};

exports.obtenerDirectores = async (req, res) => {
    try {
        const directores = await Director.find();
        res.status(200).json(directores);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener directores', error });
    }
};

exports.actualizarDirector = async (req, res) => {
    try {
        const { id } = req.params;
        const datosActualizar = req.body;
        datosActualizar.fechaActualizacion = Date.now();

        const directorActualizado = await Director.findByIdAndUpdate(id, datosActualizar, { new: true });

        if (!directorActualizado) {
            return res.status(404).json({ mensaje: 'Director no encontrado' });
        }

        res.status(200).json(directorActualizado);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar el director', error });
    }
};

exports.eliminarDirector = async (req, res) => {
    try {
        const { id } = req.params;
        const directorEliminado = await Director.findByIdAndUpdate(
            id,
            { estado: 'Inactivo', fechaActualizacion: Date.now() },
            { new: true }
        );

        if (!directorEliminado) {
            return res.status(404).json({ mensaje: 'Director no encontrado' });
        }

        res.status(200).json({ mensaje: 'Director inactivado', director: directorEliminado });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el director', error });
    }
};