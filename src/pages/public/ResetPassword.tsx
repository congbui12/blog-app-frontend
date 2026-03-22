import { useSearchParams, useNavigate } from 'react-router-dom';
import { useResetPassword } from '../../hooks';
import ResetPasswordForm from '../../components/features/form/ResetPasswordForm';
import type { ResetPasswordFormDTO } from '../../schemas';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const navigate = useNavigate();
  const { mutate, isPending } = useResetPassword();

  const handleResetPassword = async (data: ResetPasswordFormDTO) => {
    mutate(
      { ...data, resetPasswordToken: token },
      { onSuccess: () => navigate('/login', { replace: true }) }
    );
  };

  return (
    <div className="min-h-screen flex flex-col justify-center px-6 py-12 lg:px-8 bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold tracking-tight text-gray-900">
          Reset password
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-110">
        <div className="bg-white py-10 px-6 shadow-xl border border-gray-100 rounded-3xl sm:px-12">
          <ResetPasswordForm onSubmit={handleResetPassword} isLoading={isPending} />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
