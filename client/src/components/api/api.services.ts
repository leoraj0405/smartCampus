import axios from "axios";

export const loginApiServices = (payload: any) => {
    const data = {
        emailId: payload?.email,
        password: payload?.password
    };

    const apiUrl = payload?.role === 'Admin' ? 'admin/login' : 'staff/login'

    return axios.post(
        `${import.meta.env.VITE_API_URL}/${apiUrl}`,
        data,
        {
            headers: {
                "Content-Type": "application/json",
            }
        }
    );
};
