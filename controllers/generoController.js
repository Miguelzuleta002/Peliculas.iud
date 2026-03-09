// Importamos el "molde" que acabamos de crear
const Genero = require('../models/Genero');

// Función para CREAR un nuevo género (POST)
exports.crearGenero = async (req, res) => {
    try {
        // req.body es la información que nos enviarán desde Postman
        const nuevoGenero = new Genero(req.body);

        // Guardamos en la base de datos
        await nuevoGenero.save();

        // Respondemos que todo salió bien (Código 201: Creado)
        res.status(201).json(nuevoGenero);
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Hubo un error al crear el género' });
    }
};

// Función para OBTENER todos los géneros (GET)
exports.obtenerGeneros = async (req, res) => {
    try {
        // Busca todos los registros que existan en la colección de Géneros
        const generos = await Genero.find();

        res.status(200).json(generos);
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Hubo un error al obtener los géneros' });
    }
};

// Función para ACTUALIZAR un género (PUT)
exports.actualizarGenero = async (req, res) => {
    try {
        // Obtenemos el ID que viene en la URL
        const { id } = req.params;
        const datosActualizar = req.body;

        // Actualizamos la fecha de modificación al momento exacto actual
        datosActualizar.fechaActualizacion = Date.now();

        // findByIdAndUpdate busca el registro por ID y le inyecta los nuevos datos
        // { new: true } le dice a Mongoose que nos devuelva el registro ya modificado
        const generoActualizado = await Genero.findByIdAndUpdate(id, datosActualizar, { new: true });

        if (!generoActualizado) {
            return res.status(404).json({ mensaje: 'Género no encontrado' });
        }

        res.status(200).json(generoActualizado);
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Hubo un error al actualizar el género' });
    }
};

// Función para ELIMINAR un género (DELETE) - Usando Soft Delete
exports.eliminarGenero = async (req, res) => {
    try {
        const { id } = req.params;

        // En lugar de borrarlo, actualizamos su estado a 'Inactivo'
        const generoInactivado = await Genero.findByIdAndUpdate(
            id,
            { estado: 'Inactivo', fechaActualizacion: Date.now() },
            { new: true }
        );

        if (!generoInactivado) {
            return res.status(404).json({ mensaje: 'Género no encontrado' });
        }

        res.status(200).json({ mensaje: 'Género inactivado correctamente', genero: generoInactivado });
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Hubo un error al eliminar el género' });
    }
};