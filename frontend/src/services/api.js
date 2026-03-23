import axios from 'axios';

// Instancia configurada de Axios apuntando al backend local
const api = axios.create({
    baseURL: 'http://localhost:4000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;
