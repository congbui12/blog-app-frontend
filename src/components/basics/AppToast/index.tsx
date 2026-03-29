import * as Toast from '@radix-ui/react-toast';
import { XIcon } from 'lucide-react';

interface AppToastProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  type: 'success' | 'error';
}

const AppToast = ({ open, onOpenChange, title, description, type }: AppToastProps) => {
  return (
    <Toast.Root
      className="relative bg-white rounded-lg shadow-lg p-4 pr-10 flex flex-col gap-1 border-l-4 data-[state=open]:animate-slideIn data-[state=closed]:animate-hide"
      style={{ borderLeftColor: type === 'success' ? '#10b981' : '#ef4444' }}
      open={open}
      onOpenChange={onOpenChange}
      duration={3000}
    >
      <div className="flex flex-col gap-1">
        {title && (
          <Toast.Title className="font-bold text-slate-900 text-sm leading-relaxed">
            {title}
          </Toast.Title>
        )}
        {description && (
          <Toast.Description className="text-slate-600 text-xs leading-relaxed">
            {description}
          </Toast.Description>
        )}
      </div>
      <Toast.Close
        className="absolute top-2 right-2 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-200"
        aria-label="Close"
      >
        <XIcon className="h-4 w-4" />
      </Toast.Close>
    </Toast.Root>
  );
};

export default AppToast;
