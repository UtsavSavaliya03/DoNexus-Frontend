import axios from 'axios';
import { Cookies } from "react-cookie";

const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    }
});

api.interceptors.request.use(
    config => {
        const cookies = new Cookies();
        const { token } = cookies.getAll();
        if (token && token != 'null') {
            config.headers.Authorization = `Bearer ${token}`
            return config;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default api;