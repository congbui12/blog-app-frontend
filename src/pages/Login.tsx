import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useLogin } from '../hooks';
import { type LoginDTO } from '../schemas';
import LoginForm from '../components/features/form/LoginForm';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || '/dashboard';
  const { mutate, isPending } = useLogin();

  const handleLogin = (data: LoginDTO) => {
    mutate(data, { onSuccess: () => navigate(redirectTo, { replace: true }) });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center px-6 py-12 lg:px-8 bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-110">
        <div className="bg-white py-10 px-6 shadow-xl border border-gray-100 rounded-3xl sm:px-12">
          <LoginForm onSubmit={handleLogin} isLoading={isPending} />

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link
                to="/register"
                prefetch="intent"
                className="font-bold text-blue-600 hover:text-blue-500 underline decoration-2 underline-offset-4"
              >
                Create one now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
