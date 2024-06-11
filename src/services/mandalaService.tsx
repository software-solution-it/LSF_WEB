import axios from "axios";


const createMandala = async (mandala: any) => {
    try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.put('/api/mandala/update', mandala, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;  
    } catch (error) {
        console.error(error); 
    }
};


const listMandala = async () => {
    try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`/api/mandala`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data
    } catch (error) {
        console.error(error); 
    }
};

export default {createMandala, listMandala};