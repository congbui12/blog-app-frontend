import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from "react-router-dom";
import userAPI from '../../api/userAPI';
import { useAuth } from '../../contexts/AuthContext';

const ConfirmEmail = () => {
    const { user } = useAuth();
    const [message, setMessage] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const token = searchParams.get('token') || '';

    useEffect(() => {
        const confirmEmail = async () => {
            const res = await userAPI.confirmEmailChangeAPI(token);
            setMessage(res.message);
        }

        confirmEmail();
    }, [token]);

    return (
        <div className='max-w-lg mx-auto border border-gray-500 rounded-md shadow-md p-4 mt-4 flex flex-col gap-4 items-center justify-center'>
            <h1 className='text-xl text-blue-500 font-bold'>Confirm email change</h1>
            <p className='text-gray-700 text-center'>{message}</p>
            {user
                ? <Link to='/protected/me' className='text-blue-400 hover:text-blue-500 font-semibold'>Go back to profile</Link>
                : <Link to='/login' className='text-blue-400 hover:text-blue-500 font-semibold'>Go to login</Link>}

        </div>
    )
}

export default ConfirmEmail