import axios from "axios";


const createTechnician = async (id:number) => {
    try {
        const response = await axios.post('/api/Technician',{
            techId: id
        });
        return response.data;  
    } catch (error) {
        console.error(error); 
    }
};


const listTechnician = async () => {
    try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`/api/Technician`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data
    } catch (error) {
        console.error(error); 
    }
};

export default {createTechnician, listTechnician};