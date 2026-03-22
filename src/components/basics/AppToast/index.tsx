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
      className="bg-white rounded-lg shadow-lg p-4 flex flex-col gap-1 border-l-4 data-[state=open]:animate-slideIn data-[state=closed]:animate-hide"
      style={{ borderLeftColor: type === 'success' ? '#10b981' : '#ef4444' }}
      open={open}
      onOpenChange={onOpenChange}
      duration={2000}
    >
      <div className="flex justify-between items-start">
        {title && <Toast.Title className="font-bold text-slate-900 text-sm">{title}</Toast.Title>}
        <Toast.Close className="text-slate-400 hover:text-slate-600">
          <XIcon className="h-5 w-5" />
        </Toast.Close>
      </div>
      {description && (
        <Toast.Description className="text-slate-600 text-xs">{description}</Toast.Description>
      )}
    </Toast.Root>
  );
};

export default AppToast;
