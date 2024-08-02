import axios from 'axios';

const confirmation = async (token: string, Id: number ) => {
    try {
        const confirmantionResponse = await axios.post("/api/ResetPassword/Confirmation",
            {token,Id});
        
        return confirmantionResponse.data; 
    } catch (error) {
        console.error(error);
        return { status: "error", message: "token não encontrado" };
    }
};

export default confirmation;