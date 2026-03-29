const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const conectarDB = require('./config/db'); // Importaremos la conexión que haremos en el siguiente paso

// 1. Cargar las variables de entorno (como la URL de tu base de datos)
dotenv.config();

// 2. Conectar a la base de datos de MongoDB Atlas
conectarDB();

// 3. Inicializar la aplicación Express
const app = express();

// 4. Middlewares (Configuraciones generales)
app.use(cors()); // Permite que otros dominios (como tu futuro frontend) se conecten a la API
app.use(express.json()); // Permite que la aplicación entienda los datos en formato JSON que enviaremos desde Postman

// 5. Rutas de la API (Aquí conectamos a los "meseros" que creamos antes)
app.use('/api/generos', require('./routes/genero'));
app.use('/api/directores', require('./routes/director'));
app.use('/api/productoras', require('./routes/productora'));
app.use('/api/tipos', require('./routes/tipo'));
app.use('/api/medias', require('./routes/media'));

// 6. Definir el puerto y arrancar el servidor
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`El servidor está corriendo perfectamente en el puerto ${PORT}`);
});