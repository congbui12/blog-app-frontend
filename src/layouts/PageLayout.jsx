import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const PageLayout = ({ children }) => {
    return (
        <div className='min-h-screen flex flex-col bg-gradient-radial gap-4'>
            <NavBar />
            <main className='flex-grow mx-auto px-4 py-8 w-full max-w-5xl'>
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default PageLayout;