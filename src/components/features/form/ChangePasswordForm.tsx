import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { changePasswordSchema, type ChangePasswordDTO } from '../../../schemas';
import InputField from '../../basics/InputField';
import Button from '../../basics/Button';
import { KeyIcon, LockIcon } from 'lucide-react';

interface ChangePasswordFormProps {
  onSubmit: (data: ChangePasswordDTO) => void;
  isLoading: boolean;
}

const ChangePasswordForm = ({ onSubmit, isLoading }: ChangePasswordFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm<ChangePasswordDTO>({
    resolver: yupResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full">
      <InputField
        label="Current password"
        icon={KeyIcon}
        type="password"
        placeholder="******"
        control={control}
        name="currentPassword"
      />
      <InputField
        label="New password"
        icon={LockIcon}
        type="password"
        placeholder="******"
        control={control}
        name="newPassword"
      />
      <InputField
        label="Confirm password"
        icon={LockIcon}
        type="password"
        placeholder="******"
        control={control}
        name="confirmPassword"
      />
      <Button
        type="submit"
        disabled={isLoading || !isDirty}
        className="w-full py-3 mt-2 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700 shadow-lg shadow-teal-200 disabled:opacity-70 transition-all"
      >
        {isLoading ? 'Submitting...' : 'Submit'}
      </Button>
    </form>
  );
};

export default ChangePasswordForm;
