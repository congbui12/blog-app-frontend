import { Link } from 'react-router-dom';
import { useForgotPassword } from '../hooks';
import type { InitiatePasswordResetDTO } from '../schemas';
import ForgotPasswordForm from '../components/features/form/ForgotPasswordForm';

const ForgotPassword = () => {
  const { mutate, isPending } = useForgotPassword();

  const handleSendEmail = (data: InitiatePasswordResetDTO) => {
    mutate(data);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center px-6 py-12 lg:px-8 bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold tracking-tight text-gray-900">
          Forgot password?
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-110">
        <div className="bg-white py-10 px-6 shadow-xl border border-gray-100 rounded-3xl sm:px-12">
          <ForgotPasswordForm onSubmit={handleSendEmail} isLoading={isPending} />
          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <Link
              to="/login"
              prefetch="intent"
              className="font-bold text-sky-600 hover:text-sky-500 underline decoration-2 underline-offset-4"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
