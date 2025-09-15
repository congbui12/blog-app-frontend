import axiosInstance from "../services/axiosInstance";

const USER_BASE_URL = `${import.meta.env.VITE_BACKEND_BASE_URL}/api/user`;

const fetchMyProfileAPI = async () => {
    try {
        const response = await axiosInstance.get(`${USER_BASE_URL}/me`, { withCredentials: true });
        return response.data;
    } catch (error) {
        // console.error('Fetch profile error: ', error);
        return {
            ok: false,
            message: error.response ? error.response.data.message : 'Network error',
            details: error.response ? error.response.data.details : null
        };
    }
}

const editProfileAPI = async (username) => {
    try {
        const response = await axiosInstance.patch(`${USER_BASE_URL}/me`, { username }, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Edit profile error: ', error);
        return {
            ok: false,
            message: error.response ? error.response.data.message : 'Network error',
            details: error.response ? error.response.data.details : null
        };
    }
}

const changeEmailAPI = async (newEmail) => {
    try {
        const response = await axiosInstance.patch(`${USER_BASE_URL}/me/email`, { newEmail }, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Change email error: ', error);
        return {
            ok: false,
            message: error.response ? error.response.data.message : 'Network error',
            details: error.response ? error.response.data.details : null
        };
    }
}

const confirmEmailChangeAPI = async (token) => {
    try {
        const response = await axiosInstance.get(`${USER_BASE_URL}/confirm-email`, {
            params: { token },
        }, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Confirm email change error: ', error);
        return {
            ok: false,
            message: error.response ? error.response.data.message : 'Network error',
            details: error.response ? error.response.data.details : null
        };
    }
}

const changePasswordAPI = async (currentPassword, newPassword, confirmPassword) => {
    try {
        const response = await axiosInstance.patch(`${USER_BASE_URL}/me/password`, { currentPassword, newPassword, confirmPassword }, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Change password error: ', error);
        return {
            ok: false,
            message: error.response ? error.response.data.message : 'Network error',
            details: error.response ? error.response.data.details : null
        };
    }
}

const fetchMyPostsAPI = async (sortedBy = '', page = 1, limit = 3) => {
    try {
        const response = await axiosInstance.get(`${USER_BASE_URL}/me/posts`, {
            params: {
                sortedBy,
                page,
                limit,
            },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Fetch own posts error: ', error);
        return {
            ok: false,
            message: error.response ? error.response.data.message : 'Network error',
            details: error.response ? error.response.data.details : null
        };
    }
}

const fetchFavoritePostsAPI = async (page = 1, limit = 3) => {
    try {
        const response = await axiosInstance.get(`${USER_BASE_URL}/me/favorites`, {
            params: {
                page,
                limit,
            },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Fetch favorite posts error: ', error);
        return {
            ok: false,
            message: error.response ? error.response.data.message : 'Network error',
            details: error.response ? error.response.data.details : null
        };
    }
}

export default {
    fetchMyProfileAPI,
    editProfileAPI,
    changeEmailAPI,
    confirmEmailChangeAPI,
    changePasswordAPI,
    fetchMyPostsAPI,
    fetchFavoritePostsAPI,
}