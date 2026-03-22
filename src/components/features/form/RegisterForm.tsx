import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema, type RegisterDTO } from '../../../schemas';
import InputField from '../../basics/InputField';
import Button from '../../basics/Button';
import { UserIcon, AtSignIcon, KeyIcon } from 'lucide-react';

interface RegisterFormProps {
  onSubmit: (data: RegisterDTO) => void;
  isLoading: boolean;
}

const RegisterForm = ({ onSubmit, isLoading }: RegisterFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm<RegisterDTO>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full">
      <InputField
        label="Username"
        icon={UserIcon}
        placeholder="e.g. john_doe"
        control={control}
        name="username"
      />
      <InputField
        label="Email"
        icon={AtSignIcon}
        placeholder="e.g. jdoe@example.com"
        control={control}
        name="email"
      />
      <InputField
        label="Password"
        type="password"
        icon={KeyIcon}
        placeholder="******"
        control={control}
        name="password"
      />
      <Button
        type="submit"
        disabled={isLoading || !isDirty}
        className="w-full py-3 mt-2 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 shadow-lg shadow-green-200 disabled:opacity-70 transition-all"
      >
        {isLoading ? 'Creating...' : 'Sign Up'}
      </Button>
    </form>
  );
};

export default RegisterForm;
