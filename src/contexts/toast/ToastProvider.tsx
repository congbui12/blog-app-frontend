import { useState, useCallback, useMemo } from 'react';
import * as Toast from '@radix-ui/react-toast';
import { ToastContext, type ToastType } from './ToastContext';
import AppToast from '../../components/basics/AppToast';

interface ToastItem extends ToastType {
  id: string;
}

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback(({ title, description, type }: Omit<ToastType, 'open'>) => {
    setToasts((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        open: true,
        title,
        description,
        type,
      },
    ]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      <Toast.Provider swipeDirection="right">
        {children}
        {toasts.map((toast) => (
          <AppToast
            key={toast.id}
            open={toast.open}
            onOpenChange={(open) => {
              if (!open) {
                removeToast(toast.id);
              }
            }}
            title={toast.title}
            description={toast.description}
            type={toast.type}
          />
        ))}
        <Toast.Viewport className="fixed bottom-0 right-0 flex flex-col p-6 gap-3 w-97.5 max-w-[100vw] m-0 list-none z-2147483647 outline-none" />
      </Toast.Provider>
    </ToastContext.Provider>
  );
};
