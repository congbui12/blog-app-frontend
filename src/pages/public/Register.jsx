import React, { useState } from 'react';
import authAPI from "../../api/authAPI";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        const res = await authAPI.registerAPI(username, email, password);

        if (res.ok) {
            toast.success(`${res.message}. Redirecting to login.`);
            navigate('/login');
        } else {
            toast.error(res.message);
        }
    }

    return (
        <div className='max-w-sm mx-auto mt-10'>
            <form onSubmit={handleRegister} className='border border-gray-500 rounded-md shadow-md flex flex-col p-4 gap-4 w-full'>
                <h1 className='text-center font-bold text-blue-500 text-xl'>Register form</h1>
                <div className='flex flex-col gap-1'>
                    <label htmlFor='username' className='text-blue-500 font-semibold'>Username</label>
                    <input type="text"
                        name="username"
                        id="username"
                        value={username}
                        required
                        onChange={(e) => setUsername(e.target.value)}
                        className='border border-gray-500 rounded-md p-2'
                    />
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor='email' className='text-blue-500 font-semibold'>Email</label>
                    <input type="email"
                        name="email"
                        id="email"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        className='border border-gray-500 rounded-md p-2'
                    />
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor='password' className='text-blue-500 font-semibold'>Password</label>
                    <input type="password"
                        name="password"
                        id="password"
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        className='border border-gray-500 rounded-md p-2'
                    />
                </div>
                <button type='submit' className='p-2 border border-gray-500 rounded-2xl font-bold text-blue-400 hover:text-white hover:bg-blue-500'>Register</button>
                <p className='text-blue-500 text-center font-semibold'>Already have an account? <a href="/login" className='font-bold underline'>Login now!</a></p>
            </form>
        </div>
    )
}

export default Register