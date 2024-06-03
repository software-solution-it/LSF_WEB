import axios from "axios";


const createTechnician = async (id:number) => {
    try {
        const response = await axios.post('/api/api/Technician',{
            techId: id
        });
        return response.data;  
    } catch (error) {
        console.error(error);
    }
};

export default createTechnician;