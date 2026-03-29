import { NavLink, Outlet } from 'react-router-dom';
import Layout from '../components/layout';
import { useAuth, useUpdateProfile, useChangePassword } from '../hooks';
import type { User } from '../types';
import type { EditProfileDTO, ChangePasswordDTO } from '../schemas';

export interface ProfileContextType {
  user: User;
  updateProfile: (data: EditProfileDTO) => void;
  isUpdatePending: boolean;
  changePassword: (data: ChangePasswordDTO) => void;
  isPasswordPending: boolean;
}

const Profile = () => {
  const { user } = useAuth();
  const { mutate: updateProfile, isPending: isUpdateProfilePending } = useUpdateProfile();
  const { mutate: changePassword, isPending: isChangePasswordPending } = useChangePassword();

  if (!user) return <div>Please log in to view this page.</div>;

  return (
    <Layout>
      <div className="max-w-2xl mx-auto p-6">
        <nav className="flex gap-4 border-b mb-6">
          <NavLink
            to="/profile"
            end
            className={({ isActive }) => (isActive ? 'border-teal-600' : '')}
          >
            General Info
          </NavLink>
          <NavLink
            to="/profile/change-password"
            className={({ isActive }) => (isActive ? 'border-teal-600' : '')}
          >
            Change Password
          </NavLink>
        </nav>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <Outlet
            context={{
              user,
              updateProfile,
              isUpdatePending: isUpdateProfilePending,
              changePassword,
              isPasswordPending: isChangePasswordPending,
            }}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
