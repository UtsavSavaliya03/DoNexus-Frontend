import api from "../index.js";

export const SignupApi = (params) => api.post('auth/signup', params);
export const LoginApi = (params) => api.post('auth/signin', params);