import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { resetPasswordFormSchema, type ResetPasswordFormDTO } from '../../../schemas';
import AppTextField from '../../basics/AppTextField';
import { Flex, Button } from '@radix-ui/themes';
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
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <Flex direction="column" gap="4" align="stretch">
        <AppTextField
          label="New password"
          type="password"
          icon={KeyIcon}
          placeholder="******"
          control={control}
          name="newPassword"
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
          Save
        </Button>
      </Flex>
    </form>
  );
};

export default ResetPasswordForm;
