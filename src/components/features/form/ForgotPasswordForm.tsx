import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import InputField from '../../basics/InputField';
import { MailIcon } from 'lucide-react';
import Button from '../../basics/Button';
import { initiatePasswordResetSchema, type InitiatePasswordResetDTO } from '../../../schemas';

interface ForgotPasswordFormProps {
  onSubmit: (data: InitiatePasswordResetDTO) => void;
  isLoading: boolean;
}

const ForgotPasswordForm = ({ onSubmit, isLoading }: ForgotPasswordFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm<InitiatePasswordResetDTO>({
    resolver: yupResolver(initiatePasswordResetSchema),
    defaultValues: {
      email: '',
    },
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full">
      <InputField
        label="Enter your email to receive a reset link"
        icon={MailIcon}
        placeholder="e.g. jdoe@example.com"
        control={control}
        name="email"
      />
      <Button
        type="submit"
        disabled={isLoading || !isDirty}
        className="w-full py-3 mt-2 bg-cyan-500 text-white font-bold rounded-xl hover:bg-cyan-600 shadow-lg shadow-cyan-200 disabled:opacity-70 transition-all"
      >
        {isLoading ? 'Sending...' : 'Send'}
      </Button>
    </form>
  );
};

export default ForgotPasswordForm;
