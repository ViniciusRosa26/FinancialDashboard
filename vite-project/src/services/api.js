import axios from "axios";

// Usa a URL configurada por ambiente; sem ela, reutiliza a mesma origem da aplicação.
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL ?? ""
});

export default api;
