import api from './api';

const createTechnician = async (id:number) => {
    try {
        const response = await api.post('/Technician',{
            techId: id
        });
        return response.data;  
    } catch (error) {
        console.error(error);
    }
};

export default createTechnician;