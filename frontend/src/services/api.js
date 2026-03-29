import axios from 'axios';

// Instancia configurada de Axios apuntando al backend local o de producción
const apiEndpoint = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

const api = axios.create({
    baseURL: apiEndpoint,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;
