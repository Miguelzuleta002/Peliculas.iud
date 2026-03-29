# 🎬 Catálogo Institucional de Películas y Series (IU Digital) - Stack MERN Completo


## 🎯 Propósito del Proyecto
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

Toda la lógica puede ser consumida y probada libremente mediante clientes REST como Postman, Thunder Client o Insomnia de cara a la integración con el Frontend.

---

## 💻 Frontend - Interfaz de Usuario (React SPA)

Como segunda etapa fundamental arquitectónica del caso de estudio, se construyó la vista del cliente utilizando **React** apoyado en el potente empaquetador **Vite**, obteniendo una Single Page Application conectada en tiempo real hacia Node.js mediante **Axios**.

### Características Principales del Frontend
1. **Interfaz de Catálogo Modular:** Una cuadrícula visual inspirada en grandes plataformas de streaming. Permite la visualización de los elementos mediante tarjetas responsivas que, asistadas por React Router DOM, separan fluidamente las categorías en rutas distintas (`/peliculas` y `/series`).
2. **Detalles Inmersivos (Movie Detail):** Se habilitó una vista completa generada dinámicamente (`/pelicula/:id`) que despliega la sinopsis, metadata cruzada con de la DB (Director, Tipo, Productora) y un enlace para reproducir el elemento.
3. **Panel de Administración Total (CRUD):** 5 completas pantallas interactivas exclusivas para uso administrativo de la Universidad para Gestionar todas las colecciones. Los formularios de películas aplican las reglas de negocio estrictas auto-completando listas desplegables únicamente con entidades que el servidor reporte en estado **Activo**.
4. **Diseño Visual UX/UI (Cuevana-style):** Implementación hecha 100% a la medida (Vanilla CSS) respetando las bases del Glassmorphism, variables semánticas, fondos difusos para modo oscuro y fluidez superior.

---

## 🚀 Fase 4: Despliegue en Producción (Arquitectura Híbrida)

El proyecto cuenta con una arquitectura de despliegue moderna, utilizando **contenedores Docker** para aislar el entorno del API (Servidor) y una red de distribución estática (Frontend) para alojar el cliente, maximizando la separación de preocupaciones y rendimiento.

Esta documentación refleja el proceso paso a paso para elevar ambos ecosistemas a Internet de manera gratuita.

### 🐳 1. Backend: Despliegue con Docker (Render)
Se desarrolló un `Dockerfile` optimizado (basado en `node:18-alpine`) garantizando escalabilidad cero-problemas ("*works on my machine*"). El proveedor recomendado para este contenedor lógico es **Render**.

**Procedimiento en Render:**
1. Registre una cuenta en [Render.com](https://render.com/).
2. Presione en **New +** y elija **Web Service**.
3. Autorice GitHub e importe este repositorio.
4. En el apartado *Environment* (Entorno de ejecución), seleccione **`Docker`** (no Node).
   > *Render utilizará automáticamente el `Dockerfile` presente en la raíz del backend para armar la imagen.*
5. Baje hasta encontrar **Environment Variables** (Variables de Entorno) y configure los secretos obligatorios:
   * `MONGO_URI`: Cadena URI de conexión a tu clúster de MongoDB Atlas.
   * `PORT`: `4000` (El puerto que la API expone internamente).
6. Tras presionar "Create", Render asignará una URL HTTPS (Ej. `https://backend.onrender.com`).
> **CRÍTICO:** Copie la URL pública generada por Render, será el enlace vital del Frontend.

### 🌐 2. Frontend: Despliegue Estático (Vercel)
Vercel es la infraestructura predeterminada recomendada para servir aplicaciones React bajo el ecosistema Vite con máximo rendimiento CDN.

**Procedimiento en Vercel:**
1. Inicie sesión en el portal de [Vercel](https://vercel.com/new).
2. Presione **Add New Project** y conecte este mismo repositorio de GitHub.
3. ⚠️ **Configuración del Root Directory (MUY IMPORTANTE):** Dado que Vercel intenta construir desde la raíz, debes presionar en el botón **Edit** (*Root Directory*) y forzar a Vercel a enfocar su compilación en la sub-carpeta exclusiva **`frontend/`**.
4. Vercel detectará el Framework **Vite** de forma automática.
5. Ingrese y despliegue las opciones **Environment Variables** y añada:
   * **Name:** `VITE_API_URL`
   * **Value:** Pegue la URL de Render que usted copió en la fase anterior agregando `/api` al final (Ejemplo: `https://backend.onrender.com/api`). 
6. Presione **Deploy**. 

Su catálogo se compilará y se enlazará mundialmente con la API en menos de 90 segundos.
