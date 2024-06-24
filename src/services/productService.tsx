import axios from "axios";


const createUserProduct = async (product: any) => {
    try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.post('/api/user/UserProduct', product, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;  
    } catch (error) {
        console.error(error); 
    }
};

const getUserProduct = async (projectId: any) => {
    try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`/api/user/UserProduct?projectId=${projectId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;  
    } catch (error) {
        console.error(error); 
    }
};

export default {createUserProduct, getUserProduct};