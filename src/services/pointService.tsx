import axios from "axios";


const createPoint = async (point: PointData) => {
    try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.post(`/api/Point?projectId=${point.projectId}`, point , {
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