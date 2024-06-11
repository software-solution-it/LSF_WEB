import axios from "axios";


const createElectric = async (electric: any) => {
    try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.post('/api/electric/post', electric, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;  
    } catch (error) {
        console.error(error); 
    }
};

export default {createElectric};