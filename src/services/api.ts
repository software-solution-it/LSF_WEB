import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;
const baseURL = apiUrl
console.log(baseURL)
const api = axios.create({
    baseURL,
});
export default api;
