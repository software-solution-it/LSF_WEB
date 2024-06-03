import api from './api';

const getCurrentUser = async () => {
    try {
        const token = localStorage.getItem('accessToken');
        const response = await api.post('/api/user/Customer', {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};


const login = async (email:string, password:string) => {
    try {
        const response = await api.post(`/api/user/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
        return response.data;  
    } catch (error) {
        console.error(error);
    }
};

export default {getCurrentUser, login};