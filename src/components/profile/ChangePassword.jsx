import React, { useState } from 'react';
import userAPI from '../../api/userAPI';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { logout } = useAuth();

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast.error('New password and confirm password do not match');
        }

        const res = await userAPI.changePasswordAPI(currentPassword, newPassword, confirmPassword);
        if (res.ok) {
            await logout();
            toast.success(`${res.message}. Please login again.`);
        } else {
            toast.error(res.message);
        }
    }

    return (
        <div className='max-w-lg mx-auto bg-white p-6 rounded-md shadow-md'>
            <p className='text-2xl font-semibold text-gray-700 mb-4 text-center'>Change password</p>
            <form onSubmit={handleChangePassword}>
                <div className='flex flex-col items-start md:flex-row md:items-center gap-2 mb-4'>
                    <label className='block w-1/3 text-sm'>Current password</label>
                    <input type='password' value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required
                        className='w-2/3 border border-gray-500 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200' />
                </div>
                <div className='flex flex-col items-start md:flex-row md:items-center gap-2 mb-4'>
                    <label className='block w-1/3 text-sm'>New password</label>
                    <input type='password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required
                        className='w-2/3 border border-gray-500 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200'
                    />
                </div>
                <div className='flex flex-col items-start md:flex-row md:items-center gap-2 mb-4'>
                    <label className='block w-1/3 text-sm'>Confirm password</label>
                    <input type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required
                        className='w-2/3 border border-gray-500 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200'
                    />
                </div>
                <button
                    type='submit'
                    className='bg-blue-400 px-3 py-1 text-white rounded-md hover:bg-blue-500 transition'>Submit</button>
            </form>
        </div>
    )
}

export default ChangePassword