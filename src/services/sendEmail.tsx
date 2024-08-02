import axios from 'axios';

const sendingEmail = async (email: string) => {
    try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.post("/api/ResetPassword/email",
            {email}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(response);
        if (response.status === 200) { 
            return { status: "ok", message: response.data.message };
        }
        return { status: "error", message: response.data.message };
    } catch (error) {
        console.error(error);
    }
};

export default sendingEmail;