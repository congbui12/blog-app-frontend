import { useQueryClient, useMutation } from '@tanstack/react-query';
import { editProfile, changePassword } from '../apis';
import { useToast } from './useToast';
import type { ApiErrorResponse } from '../types';

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  return useMutation({
    mutationFn: editProfile,
    onSuccess: (response) => {
      queryClient.setQueryData(['session'], response.data.payload);
      showToast({ title: response.data.message, type: 'success' });
    },
    onError: (error: ApiErrorResponse) => {
      showToast({ title: error.message, type: 'error' });
    },
  });
};

export const useChangePassword = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  return useMutation({
    mutationFn: changePassword,
    onSuccess: (response) => {
      queryClient.clear();
      showToast({ title: response.data.message, type: 'success' });
    },
    onError: (error: ApiErrorResponse) => {
      showToast({ title: error.message, type: 'error' });
    },
  });
};
