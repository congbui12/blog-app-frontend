import React, { useState } from 'react';
import { toast } from 'react-toastify';
import userAPI from '../../api/userAPI';

const ChangeEmail = ({ user }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [email, setEmail] = useState(user?.email || '');

    const handleChangeEmail = async (e) => {
        e.preventDefault();
        const res = await userAPI.changeEmailAPI(email);
        if (res.ok) {
            setIsEditing(false);
            toast.success(res.message);

            setEmail(user.email);
        } else {
            toast.error(res.message);
        }
    }

    return (
        <div className='max-w-lg mx-auto bg-white p-6 rounded shadow-md'>
            <p className='text-2xl font-semibold text-gray-700 mb-4 text-center'>{isEditing ? 'Change email' : 'Email'}</p>
            <form onSubmit={handleChangeEmail}>
                <div className='flex flex-col items-start md:flex-row md:items-center gap-2 mb-4'>
                    <label className='block text-sm font-medium text-gray-700'>{isEditing ? 'New email' : 'Email'}</label>
                    <input
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={!isEditing}
                        required
                        className={`w-full px-3 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${!isEditing ? 'cursor-not-allowed' : ''}`}
                    />
                </div>
                {isEditing
                    ? (
                        <>
                            <button
                                type='submit'
                                className='px-3 py-1 bg-blue-400 text-white rounded-md hover:bg-blue-500 transition mr-2'
                            >Save</button>
                            <button
                                type='button'
                                onClick={() => setIsEditing(false)}
                                className='px-3 py-1 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition'
                            >Cancel</button>
                        </>

                    ) : (
                        <button
                            type='button'
                            onClick={() => setIsEditing(true)}
                            className='px-3 py-1 bg-green-400 text-white rounded-md hover:bg-green-500 transition'
                        >Edit</button>
                    )}
            </form>
        </div>
    )
}

export default ChangeEmail