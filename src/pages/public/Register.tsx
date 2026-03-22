import { useNavigate, Link } from 'react-router-dom';
import { useRegister } from '../../hooks';
import type { RegisterDTO } from '../../schemas';
import RegisterForm from '../../components/features/form/RegisterForm';

const Register = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useRegister();

  const handleRegister = (data: RegisterDTO) => {
    mutate(data, { onSuccess: () => navigate('/login', { replace: true }) });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center px-6 py-12 lg:px-8 bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold tracking-tight text-gray-900">
          Create your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-110">
        <div className="bg-white py-10 px-6 shadow-xl border border-gray-100 rounded-3xl sm:px-12">
          <RegisterForm onSubmit={handleRegister} isLoading={isPending} />

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                prefetch="intent"
                className="font-bold text-green-600 hover:text-green-500 underline decoration-2 underline-offset-4"
              >
                Login now!
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
