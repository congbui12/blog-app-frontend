import axiosInstance from "../services/axiosInstance";

const AUTH_BASE_URL = `${import.meta.env.VITE_BACKEND_BASE_URL}/api/auth`;

const registerAPI = async (username, email, password) => {
    try {
        const response = await axiosInstance.post(`${AUTH_BASE_URL}/register`, { username, email, password });
        return response.data;
    } catch (error) {
        console.error('Registration error: ', error);
        return {
            ok: false,
            message: error.response ? error.response.data.message : 'Network error',
            details: error.response ? error.response.data.details : null
        };
    }
}

const loginAPI = async (login, password) => {
    try {
        const response = await axiosInstance.post(`${AUTH_BASE_URL}/login`, {
            login,
            password
        }, {
            withCredentials: true // REQUIRED so browser accepts Set-Cookie
        });
        return response.data;
    } catch (error) {
        console.error('Login error: ', error);
        return {
            ok: false,
            message: error.response ? error.response.data.message : 'Network error',
            details: error.response ? error.response.data.details : null
        };
    }
}

const logoutAPI = async () => {
    try {
        const response = await axiosInstance.post(`${AUTH_BASE_URL}/logout`, {}, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Logout error: ', error);
        return {
            ok: false,
            message: error.response ? error.response.data.message : 'Network error',
            details: error.response ? error.response.data.details : null
        };
    }
}

const forgotPasswordAPI = async (email) => {
    try {
        const response = await axiosInstance.post(`${AUTH_BASE_URL}/forgot-password`, { email });
        return response.data;
    } catch (error) {
        console.error('Password recovery error: ', error);
        return {
            ok: false,
            message: error.response ? error.response.data.message : 'Network error',
            details: error.response ? error.response.data.details : null
        };
    }
}

const resetPasswordAPI = async (resetPasswordToken, newPassword) => {
    try {
        const response = await axiosInstance.post(`${AUTH_BASE_URL}/reset-password`, { resetPasswordToken, newPassword });
        return response.data;
    } catch (error) {
        console.error('Password reset error: ', error);
        return {
            ok: false,
            message: error.response ? error.response.data.message : 'Network error',
            details: error.response ? error.response.data.details : null
        };
    }
}

export default {
    registerAPI,
    loginAPI,
    logoutAPI,
    forgotPasswordAPI,
    resetPasswordAPI,
}