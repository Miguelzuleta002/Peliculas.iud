const mongoose = require('mongoose');

// Definimos el "molde" (Schema) para el Género
const generoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true // Es obligatorio
    },
    estado: {
        type: String,
        enum: ['Activo', 'Inactivo'], // Solo permite estas dos palabras
        default: 'Activo' // Si no enviamos nada, por defecto será Activo
    },
    descripcion: {
        type: String,
        required: true
    },
    fechaCreacion: {
        type: Date,
        default: Date.now // Guarda la fecha y hora exacta del momento en que se crea
    },
    fechaActualizacion: {
        type: Date,
        default: Date.now
    }
});

// Exportamos el modelo para poder usarlo en otras partes del proyecto (como en los controladores)
module.exports = mongoose.model('Genero', generoSchema);