import axios from 'axios';

interface InputRequest {
    input: string;
}

const sendMessageToAssistant = async (inputRequest: InputRequest) => {
    
const token = localStorage.getItem('accessToken');
    try {
        const response = await axios.post('/api/OpenAI/assistente-lavanderia', inputRequest, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error sending message to the assistant:', error);
        throw error;
    }
};

const closeChat = async () => {
    
    const token = localStorage.getItem('accessToken');
        try {
            const response = await axios.post('/api/OpenAI/fechar-chat', {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error sending message to the assistant:', error);
            throw error;
        }
    };
    

export default { sendMessageToAssistant, closeChat };
