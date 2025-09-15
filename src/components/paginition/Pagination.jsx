import React from 'react'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className='flex items-center justify-center gap-4'>
            <button
                disabled={currentPage <= 1}
                onClick={() => onPageChange(currentPage - 1)}
                className={`px-3 py-1 rounded border bg-white text-gray-700 hover:bg-blue-500 hover:text-white transition
                ${currentPage <= 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >Prev</button>
            <span className='font-medium text-gray-700'>Page {currentPage} of {totalPages}</span>
            <button
                disabled={currentPage >= totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className={`px-3 py-1 rounded border bg-white text-gray-700 hover:bg-blue-500 hover:text-white transition
                ${currentPage >= totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
            >Next</button>
        </div>
    )
}

export default Pagination