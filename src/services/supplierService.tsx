import axios from 'axios';

const getSupplierProductByType = async (type: number) => {
    try {
        const token = localStorage.getItem('accessToken');
        
        const response = await axios.get(`/api/api/Supplier/SupplierProducts?supplierType=${encodeURIComponent(type)}`, {
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
        
        const response = await axios.get(`/api/api/Supplier/SupplierType?supplierType=${encodeURIComponent(type)}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;  
    } catch (error) {
        console.error(error);
    }
};

const createUserSupplier = async (supplierType:any) => {
    try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.post(`/api/api/Supplier/UserSupplier?supplierId=${encodeURIComponent(supplierType)}`, {}, {
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

const createUserInauguration = async () => {
    try {
        const name = "Minha Lavanderia"
        const token = localStorage.getItem('accessToken');
        const response = await axios.post(`/api/api/Inauguration?name=${encodeURIComponent(name)}`, {}, {
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

const createUserTech = async (supplierType:any) => {
    try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.post(`/api/api/Technician?techId=${encodeURIComponent(supplierType)}`, {}, {
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