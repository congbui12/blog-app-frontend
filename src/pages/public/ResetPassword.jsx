import React, { useState } from 'react';
import authAPI from '../../api/authAPI';
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const ResetPassword = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const token = searchParams.get('token') || '';
    const [password, setPassword] = useState('');

    const handleResetPassword = async (e) => {
        e.preventDefault();
        const res = await authAPI.resetPasswordAPI(token, password);

        if (res.ok) {
            toast.success(`${res.message}. Redirecting to login.`);
            navigate('/login');
        } else {
            toast.error(res.message);
        }
    }

    return (
        <div className='max-w-sm mx-auto mt-10'>
            <form onSubmit={handleResetPassword} className='border border-gray-500 rounded-md shadow-md flex flex-col p-4 gap-4'>
                <h1 className='text-blue-500 font-bold text-center text-xl'>Reset password form</h1>

                <div>
                    <input type="hidden"
                        name='resetPasswordToken'
                        value={token}
                        required
                        className='sr-only' />
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="newPassword" className='text-blue-500 font-semibold'>New password</label>
                    <input type="password"
                        name='newPassword'
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        className='border border-gray-500 rounded-md p-2'
                    />
                </div>
                <button type='submit' className='p-2 border border-gray-500 rounded-2xl font-bold hover:bg-blue-500 hover:text-white'>Submit</button>
            </form>
        </div>
    )
}

export default ResetPassword