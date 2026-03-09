const mongoose = require('mongoose');

const conectarDB = async () => {
    try {
        // Intentamos conectarnos usando la variable de entorno
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Base de Datos Conectada Exitosamente a MongoDB Atlas');
    } catch (error) {
        console.log('Hubo un error conectando a la base de datos:');
        console.log(error);
        // Si hay un error, detenemos la aplicación por completo
        process.exit(1);
    }
}

// Exportamos la función para que el index.js pueda usarla
module.exports = conectarDB;