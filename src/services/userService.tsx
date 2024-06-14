import axios from "axios";

const getCurrentUser = async () => {
    try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.post('/api/user/Customer', {}, {
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
        const response = await axios.post(`/api/user/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
        return response.data;  
    } catch (error) {
        console.error(error);
    }
};

const newPassword = async (password:string) => {
    const token = localStorage.getItem('accessToken');
    try {
        const response = await axios.put(`/api/user/NewPassword?password=${encodeURIComponent(password)}`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;  
    } catch (error) {
        console.error(error);
    }
};

export default {getCurrentUser, login, newPassword};