import axios from 'axios';

const createGeolocation = async (geolocation: GeolocationData) => {
    try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.post(`/api/Geolocation?projectId=${geolocation.projectId}`, geolocation , {
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