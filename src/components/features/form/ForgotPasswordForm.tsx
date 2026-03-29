import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import AppTextField from '../../basics/AppTextField';
import { MailIcon } from 'lucide-react';
import { Flex, Button } from '@radix-ui/themes';
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
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <Flex direction="column" gap="4" align="stretch">
        <AppTextField
          label="Enter your email to receive a reset link"
          icon={MailIcon}
          placeholder="e.g. jdoe@example.com"
          control={control}
          name="email"
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
          Send
        </Button>
      </Flex>
    </form>
  );
};

export default ForgotPasswordForm;
