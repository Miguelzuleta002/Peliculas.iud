# 🎬 Backend - Catálogo Institucional de Películas y Series

Este proyecto es el **Backend (API REST)** desarrollado para la Institución Universitaria Digital de Antioquia (IU Digital). Tiene como propósito gestionar la base de datos de una futura Aplicación Web orientada al entretenimiento de docentes, estudiantes, colaboradores y público en general, permitiéndoles visualizar películas y series online de forma gratuita.

> **Nota del Proyecto:** La directiva estipuló el diseño de una aplicación estilo "Cuevana" pero estrictamente legal y sin piratería, mediante licencias obtenidas por el Alma Mater.

---

## 🏗️ Arquitectura y Tecnologías
Por recomendación del equipo de tecnología de la institución, el sistema se construye bajo una **arquitectura monolítica** estructurada, trabajando de manera separada el Frontend del Backend.

El proyecto está construido bajo el stack **MERN** (enfocado en el Backend):
* **[Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)**: Motor y Framework para construir el servidor y API RESTful.
* **[MongoDB Atlas](https://www.mongodb.com/cloud/atlas)**: Base de datos NoSQL en la nube.
* **[Mongoose](https://mongoosejs.com/)**: ODM para modelado estricto de las colecciones.
* **Otras herramientas:** Nodemon (Entorno dev), dotenv (Variables de entorno), CORS.

El código interno aplica el patrón de diseño **MVC (Modelo-Vista-Controlador)** (omitiendo las vistas), separando claramente Rutas, Controladores y Modelos de datos.

---

## 🗄️ Módulos de la Base de Datos
Siguiendo las especificaciones del Análisis Previo, la aplicación está dividida en 5 módulos relacionales principales:

### 1. Módulo de Género (`Genero.js`)
Permite registrar y editar los géneros de películas (Ej. acción, aventura, ciencia ficción, drama, terror). Una película se clasifica en un único género.
* **Campos:** Nombre, Estado (Activo/Inactivo), Descripción, Fecha de creación, Fecha de actualización.

### 2. Módulo de Director (`Director.js`)
Permite registrar y editar al director principal de la producción.
* **Campos:** Nombres, Estado (Activo/Inactivo), Fecha de creación, Fecha de actualización.

### 3. Módulo Productora (`Productora.js`)
Permite registrar y editar la productora principal de la obra (Ej. Disney, Warner, Paramount).
* **Campos:** Nombre, Estado (Activo/Inactivo), Slogan, Descripción, Fecha de creación, Fecha de actualización.

### 4. Módulo Tipo (`Tipo.js`)
Gestión de los formatos de la multimedia (Ej. Serie, Película).  
* **Campos:** Nombre, Descripción, Fecha de creación, Fecha de actualización.

### 5. Módulo de Media (`Media.js`)
Es el núcleo transaccional. Gestiona el registro completo de la producción visual unificando los catálogos anteriores. Cuenta con la regla de negocio explícita de **solo permitir asociar Géneros, Directores y Productoras que se encuentren en estado "Activo".**
* **Campos:** 
  - Serial (único)
  - Título
  - Sinopsis
  - URL de la película (único)
  - Imagen o foto de portada
  - Año de estreno
  - Referencias Foráneas (Mongoose ObjectId): Género Principal, Director Principal, Productora, Tipo.
  - Campos de auditoría: Fecha de creación, Fecha de actualización.

---

## 🛤️ Operaciones Soportadas y Desarrollo

Durante esta fase del desarrollo backend, la API permite la comunicación completa para cada módulo.

1. **Estructuración Base:** Inicialización de Node, Mongoose, Express y conexión Legacy exitosa a MongoDB Atlas (`config/db.js`).
2. **Modelaje:** Creación estricta de todos los Esquemas Mongoose solicitados, cumpliendo a cabalidad los campos exigidos por el departamento de tecnología.
3. **Controladores CRUD Completos:** Implementación de rutas (`/api/...`) GET (Leer) y POST (Crear) para los 5 módulos iniciales.
4. **Reglas de Negocio en Updates y Deletes:**
   * Lógica de actualización (PUT) y validación estricta de IDs en referenciales.
   * Lógica de eliminación (DELETE) programada mediante **Borrado Lógico (Soft-delete)** para Director y Productora para mantener el historial (cambiando su estado a 'Inactivo').
   * **Borrado Físico (Hard-delete)** programado para Tipos y Medias, conforme a la estructura del diseño.

Toda la lógica puede ser consumida y probada libremente mediante clientes REST como Postman, Thunder Client o Insomnia de cara a preparar la integración con el futuro Frontend.
