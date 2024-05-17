import axios from 'axios';

const baseURL = import.meta.env.DEV
  ? '/api'
  : 'https://api.faculdadedalavanderia.com.br/';

const api = axios.create({
    baseURL,
});
export default api;
