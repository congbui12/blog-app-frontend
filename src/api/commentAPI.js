import axiosInstance from "../services/axiosInstance";

const COMMENT_BASE_URL = `${import.meta.env.VITE_BACKEND_BASE_URL}/api/comment`;

const getCommentsByPostAPI = async (slug) => {
    try {
        const response = await axiosInstance.get(`${COMMENT_BASE_URL}/${slug}`);
        return response.data;
    } catch (error) {
        console.error('Fetch comments by post error: ', error);
        return {
            ok: false,
            message: error.response ? error.response.data.message : 'Network error',
            details: error.response ? error.response.data.details : null
        };
    }
}

const addCommentAPI = async (slug, content) => {
    try {
        const response = await axiosInstance.post(`${COMMENT_BASE_URL}/${slug}`, { content }, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Add comment error: ', error);
        return {
            ok: false,
            message: error.response ? error.response.data.message : 'Network error',
            details: error.response ? error.response.data.details : null
        };
    }

}

const editCommentAPI = async (id, newContent) => {
    try {
        const response = await axiosInstance.patch(`${COMMENT_BASE_URL}/${id}`, { newContent }, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Edit comment error: ', error);
        return {
            ok: false,
            message: error.response ? error.response.data.message : 'Network error',
            details: error.response ? error.response.data.details : null
        };
    }
}

const deleteCommentAPI = async (id) => {
    try {
        const response = await axiosInstance.delete(`${COMMENT_BASE_URL}/${id}`, { withCredentials: true });
        return response.status;
    } catch (error) {
        console.error('Delete comment error: ', error);
        return {
            ok: false,
            message: error.response ? error.response.data.message : 'Network error',
            details: error.response ? error.response.data.details : null
        };
    }
}

export default {
    getCommentsByPostAPI,
    addCommentAPI,
    editCommentAPI,
    deleteCommentAPI,
}