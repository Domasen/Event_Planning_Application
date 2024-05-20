import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:7264',
    withCredentials: true,
});

export default api;