import axios from "axios";

const createNotification = async (notification:any) => {
    try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.post('/api/notifications/create', notification, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;  
    } catch (error) {
        console.error(error);
    }
};

const getUserNotifications = async (userId:any) => {
    try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`/api/notifications/user/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response;  
    } catch (error) {
        console.error(error);
    }
};

const markAsRead = async (id:any) => { 
    try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.put(`/api/notifications/mark-as-read/${id}`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;  
    } catch (error) {
        console.error(error);
    }
};

const deleteNotification = async (id:any) => {
    try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.delete(`/api/notifications/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;  
    } catch (error) {
        console.error(error);
    }
};

export default { createNotification, getUserNotifications, markAsRead, deleteNotification };
