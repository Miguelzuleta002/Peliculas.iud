# Imagen ligera oficial de Node.js Alpine
FROM node:18-alpine

# Directorio de trabajo seguro dentro del contenedor
WORKDIR /usr/src/app

# Copiamos primero los package json para aprovechar el caché de capas de Docker
COPY package*.json ./

# Instalamos únicamente dependencias de Producción (ignora dependencias de desarrollo)
RUN npm ci --only=production

# Copiamos el resto de archivos del backend (el .dockerignore protegerá los archivos innecesarios)
COPY . .

# Exponemos explícitamente el puerto de la API Documentado
EXPOSE 4000

# Iniciamos Node.js apuntando al punto de entrada
CMD ["node", "index.js"]
