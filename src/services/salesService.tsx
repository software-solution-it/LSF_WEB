import axios from "axios";

const createSales = async (salesData: any) => {
    try {
        const formData = new FormData();
        formData.append('excelFile', salesData);
        const token = localStorage.getItem('accessToken');
        const response = await axios.post('/api/SalesReport/PostReport', formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const getSales = async (startDate: string, endDate: string) => {
    try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`/api/SalesReport/GetById?startDate=${startDate}&endDate=${endDate}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': '*/*',
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export default { createSales, getSales };
