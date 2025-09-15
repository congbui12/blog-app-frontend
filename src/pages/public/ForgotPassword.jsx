import React, { useState } from 'react';
import authAPI from '../../api/authAPI';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const handleSendEmail = async (e) => {
        e.preventDefault();
        const res = await authAPI.forgotPasswordAPI(email);

        if (res.ok) {
            toast.success(res.message);
        } else {
            toast.error(res.message);
        }
    }

    return (
        <div className='mt-10 max-w-sm mx-auto'>
            <form onSubmit={handleSendEmail} className='border border-gray-500 flex flex-col gap-4 w-full shadow-md p-4 rounded-md'>
                <h1 className='text-md text-blue-500 text-center font-bold'>Enter your email to receive password reset link</h1>

                <input type="email"
                    name='email'
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    className='border border-gray-500 rounded-md p-2'
                />
                <button type='submit' className='p-2 border border-gray-500 rounded-2xl font-bold text-blue-500 hover:text-white hover:bg-blue-500'>Submit</button>
                <p className='text-blue-500 text-center font-semibold'>Go back to login page <a href="/login" className='font-bold underline'>here</a></p>
            </form>
        </div>
    )
}

export default ForgotPassword