import axios, { AxiosError, type AxiosResponse } from 'axios';
import type { ApiSuccessResponse, ApiErrorResponse } from '../../types';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Response interceptor
instance.interceptors.response.use(
  (response: AxiosResponse<ApiSuccessResponse>) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    if (error.code === 'ECONNABORTED') {
      return Promise.reject({
        ok: false,
        message: 'Request timed out. Please try again.',
      });
    }
    return Promise.reject({
      ok: false,
      // status: error.response?.status,
      message: error.response?.data?.message || 'Internal Server Error',
    });
  }
);

export default instance;
