import api from './api';

const createGeolocation = async (geolocation: GeolocationData) => {
    try {
        const token = localStorage.getItem('accessToken');
        const response = await api.post('/api/Geolocation', geolocation , {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;  
    } catch (error) {
        console.error(error);
    }
};

export default {createGeolocation};