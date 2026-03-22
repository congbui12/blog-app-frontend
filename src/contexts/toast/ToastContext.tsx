import { createContext } from 'react';

export interface ToastType {
  open: boolean;
  title: string;
  description?: string;
  type: 'success' | 'error';
}

export interface ToastContextValue {
  showToast: (options: Omit<ToastType, 'open'>) => void;
}

export const ToastContext = createContext<ToastContextValue | undefined>(undefined);
