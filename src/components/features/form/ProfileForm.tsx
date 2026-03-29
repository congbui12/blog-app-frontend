import { useState } from 'react';
import { useForm, type Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { editProfileSchema, type EditProfileDTO } from '../../../schemas';
import AppTextField from '../../basics/AppTextField';
import { Flex, Button } from '@radix-ui/themes';
import { UserIcon } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import type { ProfileContextType } from '../../../pages/Profile';

const ProfileForm = () => {
  const { user, updateProfile, isUpdatePending } = useOutletContext<ProfileContextType>();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<EditProfileDTO>({
    resolver: yupResolver(editProfileSchema) as Resolver<EditProfileDTO>,
    values: {
      username: user.username,
    },
  });

  const handleSaveEdit = (data: EditProfileDTO) => {
    updateProfile(data);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    reset();
    setIsEditing(false);
  };

  return (
    <form onSubmit={handleSubmit(handleSaveEdit)} className="w-full md:w-3/4 mx-auto">
      <Flex direction="column" gap="4" align="stretch">
        <AppTextField
          label="Username"
          icon={UserIcon}
          placeholder="e.g. john_doe"
          control={control}
          name="username"
          disabled={!isEditing}
        />
        <Flex key={isEditing ? 'edit' : 'view'} direction="row" gap="3" align="center">
          {isEditing ? (
            <>
              <Button
                size="3"
                variant="soft"
                color="gray"
                type="button"
                onClick={handleCancelEdit}
                className="flex-1 cursor-pointer font-bold transition-all"
              >
                Cancel
              </Button>
              <Button
                size="3"
                variant="solid"
                color="cyan"
                radius="large"
                highContrast
                loading={isUpdatePending}
                disabled={!isDirty}
                type="submit"
                className="flex-1 cursor-pointer font-bold shadow-lg shadow-cyan-900/10 transition-all"
              >
                Save changes
              </Button>
            </>
          ) : (
            <Button
              size="3"
              variant="solid"
              highContrast
              type="button"
              onClick={() => setIsEditing(true)}
              className="flex-1 cursor-pointer font-bold shadow-md transition-all"
            >
              Edit profile
            </Button>
          )}
        </Flex>
      </Flex>
    </form>
  );
};

export default ProfileForm;
