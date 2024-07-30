import axios from 'axios';

const createGeolocation = async (email: any) => {
    try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.post(`/api/SendEmail?email=${encodeURIComponent(email)}`, {
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