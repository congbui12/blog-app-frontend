import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
    const { login: loginUser } = useAuth();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        const res = await loginUser(login, password);
        setLoading(false);

        const redirectTo = location.state?.from?.pathname || '/protected/dashboard';

        if (res.ok) {
            toast.success(res.message);
            navigate(redirectTo, { replace: true });
        } else {
            toast.error(res.message);
        }
    }

    return (
        <div className='max-w-sm mx-auto mt-10'>
            <form onSubmit={handleLogin} disabled={loading} className='border border-gray-500 rounded-md shadow-md flex flex-col p-4 gap-4 w-full'>
                <h1 className='text-blue-500 font-bold text-center text-xl'>Login form</h1>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="login" className='text-blue-500 font-semibold'>Username/Email</label>
                    <input type="text"
                        id="login"
                        // placeholder="Enter your email or username"
                        required
                        name="login"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        className='border border-gray-500 rounded-md p-2' />
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="password" className='text-blue-500 font-semibold'>Password</label>
                    <input type="password"
                        id="password"
                        // placeholder="Enter your password"
                        required
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='border border-gray-500 rounded-md p-2' />
                </div>
                <a href="/forgot-password" className='font-bold text-blue-500 underline text-start'>Forgot your password?</a>

                <button type="submit" className='p-2 border border-gray-500 rounded-2xl font-bold text-blue-400 hover:bg-blue-500 hover:text-white transition'>
                    {loading ? 'Logging in...' : 'Login'}
                </button>

                <p className='text-blue-500 text-center font-semibold'>Don't have an account? <a href="/register" className='font-bold underline'>Register here!</a></p>

            </form>
        </div>
    )
}

export default Login