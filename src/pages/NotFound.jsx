import React from 'react';
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className='max-w-lg mx-auto border-border-gray-500 rounded-md shadow-md p-4 mt-4 flex flex-col items-center justify-center gap-4'>
            <h1 className='text-xl text-blue-500 font-bold'>404- Page Not Found</h1>
            <p className='text-gray-700'>Sorry, the page you are looking for does not exist</p>
            <Link to='/' className='text-blue-400 font-semibold hover:text-blue-500'>Go back to Home</Link>
        </div>
    )
}

export default NotFound;