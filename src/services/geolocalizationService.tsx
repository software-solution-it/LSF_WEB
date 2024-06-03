import axios from 'axios';

const createGeolocation = async (geolocation: GeolocationData) => {
    try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.post('/api/api/Geolocation', geolocation , {
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