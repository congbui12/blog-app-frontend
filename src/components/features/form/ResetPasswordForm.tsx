import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { resetPasswordFormSchema, type ResetPasswordFormDTO } from '../../../schemas';
import InputField from '../../basics/InputField';
import Button from '../../basics/Button';
import { KeyIcon } from 'lucide-react';

interface ResetPasswordFormProps {
  onSubmit: (data: ResetPasswordFormDTO) => void;
  isLoading: boolean;
}

const ResetPasswordForm = ({ onSubmit, isLoading }: ResetPasswordFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm<ResetPasswordFormDTO>({
    resolver: yupResolver(resetPasswordFormSchema),
    defaultValues: {
      newPassword: '',
    },
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full">
      <InputField
        label="New password"
        type="password"
        icon={KeyIcon}
        placeholder="******"
        control={control}
        name="newPassword"
      />
      <Button
        type="submit"
        disabled={isLoading || !isDirty}
        className="w-full py-3 mt-2 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 shadow-lg shadow-emerald-200 disabled:opacity-70 transition-all"
      >
        {isLoading ? 'Saving...' : 'Save'}
      </Button>
    </form>
  );
};

export default ResetPasswordForm;
