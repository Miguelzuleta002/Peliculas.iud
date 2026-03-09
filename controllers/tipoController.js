// directorController.js
const Tipo = require('../models/Tipo');

exports.crearTipo = async (req, res) => {
    try {
        const nuevoTipo = new Tipo(req.body);
        await nuevoTipo.save();
        res.status(201).json(nuevoTipo);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear el tipo', error });
    }
};

exports.obtenerTipos = async (req, res) => {
    try {
        const tipos = await Tipo.find();
        res.status(200).json(tipos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener tipos', error });
    }
};

exports.actualizarTipo = async (req, res) => {
    try {
        const { id } = req.params;
        const datosActualizar = req.body;
        datosActualizar.fechaActualizacion = Date.now();

        const tipoActualizado = await Tipo.findByIdAndUpdate(id, datosActualizar, { new: true });

        if (!tipoActualizado) {
            return res.status(404).json({ mensaje: 'Tipo no encontrado' });
        }

        res.status(200).json(tipoActualizado);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar el tipo', error });
    }
};

exports.eliminarTipo = async (req, res) => {
    try {
        const { id } = req.params;
        // Tipo no tiene un campo estado, así que hacemos un delete físico (hard-delete)
        const tipoEliminado = await Tipo.findByIdAndDelete(id);

        if (!tipoEliminado) {
            return res.status(404).json({ mensaje: 'Tipo no encontrado' });
        }

        res.status(200).json({ mensaje: 'Tipo eliminado físicamente', tipo: tipoEliminado });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el tipo', error });
    }
};