import { createContext } from 'react';
import type { User } from '../../types';
import type { RefetchOptions, QueryObserverResult } from '@tanstack/react-query';

export interface AuthContextValue {
  // The current user (undefined while loading, null if guest)
  user: User | null | undefined;
  isLoading: boolean;
  refetchUser: (options?: RefetchOptions) => Promise<QueryObserverResult<User | null, Error>>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
