import api from './api';

const createPoint = async (point: PointData) => {
    try {
        const token = localStorage.getItem('accessToken');
        const response = await api.post('/Point', point , {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;  
    } catch (error) {
        console.error(error);
    }
};

export default {createPoint};