import axios from 'axios';

const getSupplierProductByType = async (type: number) => {
    try {
        const token = localStorage.getItem('accessToken');
        
        const response = await axios.get(`/api/Supplier/SupplierProducts?supplierType=${encodeURIComponent(type)}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;  
    } catch (error) {
        console.error(error);
    }
};

const getSuppliersByType = async (type: number) => {
    try {
        const token = localStorage.getItem('accessToken');
        
        const response = await axios.get(`/api/Supplier/SupplierType?supplierType=${encodeURIComponent(type)}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;  
    } catch (error) {
        console.error(error);
    }
};

const createUserSupplier = async (supplierType:any, projectId:any) => {
    try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.post(`/api/Supplier/UserSupplier?supplierId=${encodeURIComponent(supplierType)}&projectId=${projectId}`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao criar o produto do usuário:', error);
        throw error;
    }
};

const createUserInauguration = async (projectId:any) => {
    try {
        const name = "Minha Lavanderia"
        const token = localStorage.getItem('accessToken');
        const response = await axios.put(`/api/Project/PutProject?name=${encodeURIComponent(name)}&projectId=${projectId}`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao criar o produto do usuário:', error);
        throw error;
    }
};

const createUserTech = async (supplierType:any, projectId:any) => {
    try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.post(`/api/Technician?techId=${encodeURIComponent(supplierType)}&projectId=${projectId}`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao criar o produto do usuário:', error);
        throw error;
    }
};

export default { getSupplierProductByType, createUserSupplier, getSuppliersByType, createUserTech, createUserInauguration};