import { useState } from 'react';
import { useForm, type Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import type { User } from '../../../types';
import { editProfileSchema, type EditProfileDTO } from '../../../schemas';
import InputField from '../../basics/InputField';
import Button from '../../basics/Button';
import { UserIcon } from 'lucide-react';

interface ProfileFormProps {
  user: User;
  onSubmit: (data: EditProfileDTO) => void;
  isLoading: boolean;
}

const ProfileForm = ({ user, onSubmit, isLoading }: ProfileFormProps) => {
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
    onSubmit(data);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    reset();
    setIsEditing(false);
  };

  return (
    <form onSubmit={handleSubmit(handleSaveEdit)} className="flex flex-col gap-5 w-full">
      <InputField
        label="Username"
        icon={UserIcon}
        placeholder="e.g. john_doe"
        control={control}
        name="username"
        disabled={!isEditing}
      />
      <div key={isEditing ? 'edit' : 'view'} className="flex items-center gap-3">
        {isEditing ? (
          <>
            <Button
              type="button"
              onClick={handleCancelEdit}
              className="w-1/3 py-3 mt-2 bg-gray-600 text-white font-bold rounded-xl hover:bg-gray-700 shadow-lg shadow-gray-200 transition-all"
            >
              Cancel
            </Button>
            <Button
              disabled={isLoading || !isDirty}
              type="submit"
              className="w-1/3 py-3 mt-2 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700 shadow-lg shadow-teal-200 disabled:opacity-70 transition-all"
            >
              {isLoading ? 'Saving...' : 'Save'}
            </Button>
          </>
        ) : (
          <Button
            type="button"
            onClick={() => setIsEditing(true)}
            className="w-1/3 py-3 mt-2 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 shadow-lg shadow-green-200 transition-all"
          >
            Edit
          </Button>
        )}
      </div>
    </form>
  );
};

export default ProfileForm;
