// mediaController.js
const Media = require('../models/Media');
const Genero = require('../models/Genero');
const Director = require('../models/Director');
const Productora = require('../models/Productora');

exports.crearMedia = async (req, res) => {
    try {
        const { genero, director, productora } = req.body;

        // 1. Validar que el Género esté Activo
        const generoEncontrado = await Genero.findById(genero);
        if (!generoEncontrado || generoEncontrado.estado !== 'Activo') {
            return res.status(400).json({ mensaje: 'El género no existe o está inactivo' });
        }

        // 2. Validar que el Director esté Activo
        const directorEncontrado = await Director.findById(director);
        if (!directorEncontrado || directorEncontrado.estado !== 'Activo') {
            return res.status(400).json({ mensaje: 'El director no existe o está inactivo' });
        }

        // 3. Validar que la Productora esté Activa
        const productoraEncontrada = await Productora.findById(productora);
        if (!productoraEncontrada || productoraEncontrada.estado !== 'Activo') {
            return res.status(400).json({ mensaje: 'La productora no existe o está inactiva' });
        }

        // Si todo está correcto, guardamos la Media
        const nuevaMedia = new Media(req.body);
        await nuevaMedia.save();
        res.status(201).json(nuevaMedia);

    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear la producción', error });
    }
};

exports.obtenerMedias = async (req, res) => {
    try {
        // El método populate nos trae la información completa de las relaciones, no solo el ID
        const medias = await Media.find()
            .populate('genero', 'nombre estado')
            .populate('director', 'nombres estado')
            .populate('productora', 'nombre estado')
            .populate('tipo', 'nombre');

        res.status(200).json(medias);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener las producciones', error });
    }
};

exports.obtenerMediaPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const media = await Media.findById(id)
            .populate('genero', 'nombre estado')
            .populate('director', 'nombres estado')
            .populate('productora', 'nombre estado')
            .populate('tipo', 'nombre');

        if (!media) {
            return res.status(404).json({ mensaje: 'Producción no encontrada' });
        }

        res.status(200).json(media);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener la producción', error });
    }
};

exports.actualizarMedia = async (req, res) => {
    try {
        const { id } = req.params;
        const datosActualizar = req.body;

        // Validación de relaciones si se envían para actualizar
        if (datosActualizar.genero) {
            const generoEncontrado = await Genero.findById(datosActualizar.genero);
            if (!generoEncontrado || generoEncontrado.estado !== 'Activo') {
                return res.status(400).json({ mensaje: 'El género no existe o está inactivo' });
            }
        }

        if (datosActualizar.director) {
            const directorEncontrado = await Director.findById(datosActualizar.director);
            if (!directorEncontrado || directorEncontrado.estado !== 'Activo') {
                return res.status(400).json({ mensaje: 'El director no existe o está inactivo' });
            }
        }

        if (datosActualizar.productora) {
            const productoraEncontrada = await Productora.findById(datosActualizar.productora);
            if (!productoraEncontrada || productoraEncontrada.estado !== 'Activo') {
                return res.status(400).json({ mensaje: 'La productora no existe o está inactiva' });
            }
        }

        datosActualizar.fechaActualizacion = Date.now();

        const mediaActualizada = await Media.findByIdAndUpdate(id, datosActualizar, { new: true });

        if (!mediaActualizada) {
            return res.status(404).json({ mensaje: 'Producción no encontrada' });
        }

        res.status(200).json(mediaActualizada);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar la producción', error });
    }
};

exports.eliminarMedia = async (req, res) => {
    try {
        const { id } = req.params;

        // El modelo Media no tiene campo "estado", procedemos con eliminación física o se podría agregar
        // Para este caso haremos hard-delete
        const mediaEliminada = await Media.findByIdAndDelete(id);

        if (!mediaEliminada) {
            return res.status(404).json({ mensaje: 'Producción no encontrada' });
        }

        res.status(200).json({ mensaje: 'Producción eliminada correctamente', media: mediaEliminada });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar la producción', error });
    }
};