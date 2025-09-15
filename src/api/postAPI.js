import axiosInstance from "../services/axiosInstance";

const POST_BASE_URL = `${import.meta.env.VITE_BACKEND_BASE_URL}/api/post`;

const fetchPostsAPI = async (sortedBy = '', page = 1, limit = 5) => {
    try {
        const response = await axiosInstance.get(`${POST_BASE_URL}`, {
            params: { sortedBy, page, limit },
        });
        return response.data;
    } catch (error) {
        console.error('Fetch posts error: ', error);
        return {
            ok: false,
            message: error.response ? error.response.data.message : 'Network error',
            details: error.response ? error.response.data.details : null
        };
    }
}

const searchPostAPI = async (keyword) => {
    try {
        const response = await axiosInstance.get(`${POST_BASE_URL}/search`, {
            params: { keyword },
        });
        return response.data;
    } catch (error) {
        console.error('Search post error: ', error);
        return {
            ok: false,
            message: error.response ? error.response.data.message : 'Network error',
            details: error.response ? error.response.data.details : null
        };
    }
}

const createPostAPI = async (title, content) => {
    try {
        const response = await axiosInstance.post(`${POST_BASE_URL}`, { title, content }, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Create post error: ', error);
        return {
            ok: false,
            message: error.response ? error.response.data.message : 'Network error',
            details: error.response ? error.response.data.details : null
        };
    }
}

const fetchPostDetailsAPI = async (slug) => {
    try {
        const response = await axiosInstance.get(`${POST_BASE_URL}/${slug}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Fetch post details error: ', error);
        return {
            ok: false,
            message: error.response ? error.response.data.message : 'Network error',
            details: error.response ? error.response.data.details : null
        };
    }
}

const editPostAPI = async (slug, title, content) => {
    try {
        const response = await axiosInstance.patch(`${POST_BASE_URL}/${slug}`, { title, content }, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Edit post error: ', error);
        return {
            ok: false,
            message: error.response ? error.response.data.message : 'Network error',
            details: error.response ? error.response.data.details : null
        };
    }
}

const deletePostAPI = async (slug) => {
    try {
        const response = await axiosInstance.delete(`${POST_BASE_URL}/${slug}`, { withCredentials: true });
        return response.status;
    } catch (error) {
        console.error('Delete post error: ', error);
        return {
            ok: false,
            message: error.response ? error.response.data.message : 'Network error',
            details: error.response ? error.response.data.details : null
        };
    }
}

const addPostToFavoritesAPI = async (slug) => {
    try {
        const response = await axiosInstance.post(`${POST_BASE_URL}/favorites/${slug}`, {}, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Add post to favorites error: ', error);
        return {
            ok: false,
            message: error.response ? error.response.data.message : 'Network error',
            details: error.response ? error.response.data.details : null
        };
    }
}

const removePostFromFavoritesAPI = async (slug) => {
    try {
        const response = await axiosInstance.delete(`${POST_BASE_URL}/favorites/${slug}`, { withCredentials: true });
        return response.status;
    } catch (error) {
        console.error('Remove post from favorites error: ', error);
        return {
            ok: false,
            message: error.response ? error.response.data.message : 'Network error',
            details: error.response ? error.response.data.details : null
        };
    }
}

export default {
    fetchPostsAPI,
    searchPostAPI,
    createPostAPI,
    fetchPostDetailsAPI,
    editPostAPI,
    deletePostAPI,
    addPostToFavoritesAPI,
    removePostFromFavoritesAPI,
}