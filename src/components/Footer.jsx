import React from 'react'

const Footer = () => {
    return (
        <footer
            className='text-center font-bold p-4 bg-white text-gray-700'
        >
            <div>Copyright @ {new Date().getFullYear()}. All rights reserved.</div>
        </footer>
    )
}

export default Footer;