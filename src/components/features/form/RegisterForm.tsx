import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema, type RegisterDTO } from '../../../schemas';
import AppTextField from '../../basics/AppTextField';
import { Flex, Button } from '@radix-ui/themes';
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
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <Flex direction="column" gap="4" align="stretch">
        <AppTextField
          label="Username"
          icon={UserIcon}
          placeholder="e.g. john_doe"
          control={control}
          name="username"
        />
        <AppTextField
          label="Email"
          icon={AtSignIcon}
          placeholder="e.g. jdoe@example.com"
          control={control}
          name="email"
        />
        <AppTextField
          label="Password"
          type="password"
          icon={KeyIcon}
          placeholder="******"
          control={control}
          name="password"
        />
        <Button
          size="3"
          variant="solid"
          highContrast
          loading={isLoading}
          className="cursor-pointer"
          type="submit"
          disabled={!isDirty}
        >
          Sign Up
        </Button>
      </Flex>
    </form>
  );
};

export default RegisterForm;
