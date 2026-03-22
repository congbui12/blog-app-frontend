import { useQueryClient, useMutation } from '@tanstack/react-query';
import { register, login, logout, forgotPassword, resetPassword } from '../apis';
import { useToast } from './useToast';
import type { ApiErrorResponse } from '../types';

export const useRegister = () => {
  const { showToast } = useToast();
  return useMutation({
    mutationFn: register,
    onSuccess: (response) => {
      showToast({ title: `${response.data.message}. Redirecting to login`, type: 'success' });
    },
    onError: (error: ApiErrorResponse) => {
      showToast({ title: error.message, type: 'error' });
    },
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  return useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      queryClient.setQueryData(['session'], response.data.payload);
      showToast({ title: response.data.message, type: 'success' });
    },
    onError: (error: ApiErrorResponse) => {
      showToast({ title: error.message, type: 'error' });
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear();
      showToast({ title: 'Logged out successfully', type: 'success' });
    },
    onError: (error: ApiErrorResponse) => {
      showToast({ title: error.message, type: 'error' });
    },
  });
};

export const useForgotPassword = () => {
  const { showToast } = useToast();
  return useMutation({
    mutationFn: forgotPassword,
    onSuccess: (response) => {
      showToast({ title: response.data.message, type: 'success' });
    },
    onError: (error: ApiErrorResponse) => {
      showToast({ title: error.message, type: 'error' });
    },
  });
};

export const useResetPassword = () => {
  const { showToast } = useToast();
  return useMutation({
    mutationFn: resetPassword,
    onSuccess: (response) => {
      showToast({ title: `${response.data.message}. Redirecting to login`, type: 'success' });
    },
    onError: (error: ApiErrorResponse) => {
      showToast({ title: error.message, type: 'error' });
    },
  });
};
