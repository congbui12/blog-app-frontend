import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { UserIcon, KeyIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { loginSchema, type LoginDTO } from '../../../schemas';
import InputField from '../../basics/InputField';
import Button from '../../basics/Button';

interface LoginFormProps {
  onSubmit: (data: LoginDTO) => void;
  isLoading: boolean;
}

const LoginForm = ({ onSubmit, isLoading }: LoginFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm<LoginDTO>({
    resolver: yupResolver(loginSchema),
    defaultValues: { login: '', password: '' },
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full">
      <InputField
        label="Username or email"
        icon={UserIcon}
        placeholder="e.g. john_doe"
        control={control}
        name="login"
      />
      <div className="flex flex-col gap-1">
        <InputField
          label="Password"
          type="password"
          icon={KeyIcon}
          placeholder="******"
          control={control}
          name="password"
        />
        <div className="flex justify-end">
          <Link
            to="/forgot-password"
            prefetch="intent"
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            Forgot password?
          </Link>
        </div>
      </div>
      <Button
        className="w-full py-3 mt-2 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 disabled:opacity-70 transition-all"
        type="submit"
        disabled={isLoading || !isDirty}
      >
        {isLoading ? 'Verifying...' : 'Sign In'}
      </Button>
    </form>
  );
};

export default LoginForm;
