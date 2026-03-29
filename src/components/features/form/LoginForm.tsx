import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { UserIcon, KeyIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { loginSchema, type LoginDTO } from '../../../schemas';
import AppTextField from '../../basics/AppTextField';
import { Flex, Box, Button } from '@radix-ui/themes';

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
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <Flex direction="column" gap="4" align="stretch">
        <AppTextField
          label="Username or email"
          icon={UserIcon}
          placeholder="e.g. john_doe"
          control={control}
          name="login"
        />
        <Box>
          <AppTextField
            label="Password"
            type="password"
            icon={KeyIcon}
            placeholder="******"
            control={control}
            name="password"
          />
          <Flex justify="end" mt="1">
            <Link
              to="/forgot-password"
              prefetch="intent"
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              Forgot password?
            </Link>
          </Flex>
        </Box>
        <Button
          size="3"
          variant="solid"
          highContrast
          loading={isLoading}
          className="cursor-pointer"
          type="submit"
          disabled={!isDirty}
        >
          Sign In
        </Button>
      </Flex>
    </form>
  );
};

export default LoginForm;
