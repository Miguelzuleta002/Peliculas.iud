// productoraController.js
const Productora = require('../models/Productora');

exports.crearProductora = async (req, res) => {
    try {
        const nuevaProductora = new Productora(req.body);
        await nuevaProductora.save();
        res.status(201).json(nuevaProductora);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear la productora', error });
    }
};

exports.obtenerProductoras = async (req, res) => {
    try {
        const productora = await Productora.find();
        res.status(200).json(productora);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener productora', error });
    }
};

exports.actualizarProductora = async (req, res) => {
    try {
        const { id } = req.params;
        const datosActualizar = req.body;
        datosActualizar.fechaActualizacion = Date.now();

        const productoraActualizada = await Productora.findByIdAndUpdate(id, datosActualizar, { new: true });

        if (!productorActualizada) {
            return res.status(404).json({ mensaje: 'Productora no encontrada' });
        }

        res.status(200).json(productoraActualizada);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar la productora', error });
    }
};

exports.eliminarProductora = async (req, res) => {
    try {
        const { id } = req.params;
        const productoraEliminada = await Productora.findByIdAndUpdate(
            id,
            { estado: 'Inactivo', fechaActualizacion: Date.now() },
            { new: true }
        );

        if (!productoraEliminada) {
            return res.status(404).json({ mensaje: 'Productora no encontrada' });
        }

        res.status(200).json({ mensaje: 'Productora inactivada', productora: productoraEliminada });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar la productora', error });
    }
};