import axios from "axios";

const getProjectById = async (id:number) => {
    try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`/api/Project/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export default {getProjectById};