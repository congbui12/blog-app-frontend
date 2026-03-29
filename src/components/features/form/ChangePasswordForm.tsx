import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { changePasswordSchema, type ChangePasswordDTO } from '../../../schemas';
import AppTextField from '../../basics/AppTextField';
import { Flex, Button } from '@radix-ui/themes';
import { KeyIcon, LockIcon } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import type { ProfileContextType } from '../../../pages/Profile';

const ChangePasswordForm = () => {
  const { changePassword, isPasswordPending } = useOutletContext<ProfileContextType>();
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
    <form onSubmit={handleSubmit(changePassword)} className="w-full md:w-3/4 mx-auto">
      <Flex direction="column" gap="4" align="stretch">
        <AppTextField
          label="Current password"
          icon={KeyIcon}
          type="password"
          placeholder="******"
          control={control}
          name="currentPassword"
        />
        <AppTextField
          label="New password"
          icon={LockIcon}
          type="password"
          placeholder="******"
          control={control}
          name="newPassword"
        />
        <AppTextField
          label="Confirm password"
          icon={LockIcon}
          type="password"
          placeholder="******"
          control={control}
          name="confirmPassword"
        />
        <Button
          size="3"
          variant="solid"
          highContrast
          loading={isPasswordPending}
          className="cursor-pointer"
          type="submit"
          disabled={!isDirty}
        >
          Submit
        </Button>
      </Flex>
    </form>
  );
};

export default ChangePasswordForm;
