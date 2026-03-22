import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { AuthContext } from './AuthContext';
import { getProfile } from '../../apis';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    data: user,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const response = await getProfile();
      return response.data.payload ?? null;
    },
    retry: false,
    // staleTime: 1000 * 60 * 5,
  });

  const value = useMemo(
    () => ({
      user,
      isLoading,
      refetchUser: refetch,
    }),
    [user, isLoading, refetch]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
