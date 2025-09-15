import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import helper from '../services/helper';

const NavBar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [dropDownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleLogout = async () => {
        const res = await logout();
        if (res.ok) {
            toast.success('Logout successfully');
        } else {
            toast.error('Logout error');
        }
        navigate('/login');
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <nav className='bg-white shadow-md'>
            <ul className='max-w-7xl mx-auto px-4 py-3 flex items-center justify-center md:justify-end gap-4'>
                <li>
                    <Link to='/' className='text-gray-700 hover:text-blue-500 font-medium'>Home</Link>
                </li>
                {user && (
                    <li>
                        <Link to='/protected/dashboard' className='text-gray-700 hover:text-blue-500 font-medium'>Dashboard</Link>
                    </li>
                )}
                {!user
                    ? (
                        <li><Link to='/login' className='text-gray-700 hover:text-blue-500 font-medium'>Login</Link></li>
                    ) : (
                        <div className='relative' ref={dropdownRef}>
                            <button
                                className='text-blue-400 hover:text-blue-500 font-medium'
                                onClick={() => setDropdownOpen(!dropDownOpen)}
                            >{user.username}</button>
                            {dropDownOpen && (
                                <div className='absolute mt-3 w-20 border border-gray-500 rounded-md shadow-md z-50'>
                                    <Link
                                        to='/protected/me'
                                        className='block w-full font-bold text-gray-400 hover:text-gray-500'
                                        onClick={() => setDropdownOpen(false)}
                                    >Account</Link>
                                    <button
                                        onClick={() => {
                                            helper.handleConfirmAction('logout', handleLogout);
                                            setDropdownOpen(false);
                                        }}
                                        className="w-full font-bold text-left text-red-400 hover:text-red-500 hover:cusor-pointer">Logout</button>
                                </div>
                            )}
                        </div>
                    )}
            </ul>
        </nav>
    )
}

export default NavBar;