import React from 'react'

const PaginationFilter = ({ sortValue, onSortChange, limitValue, onLimitChange }) => {
    return (
        <div className='flex flex-col md:flex-row items-center justify-center gap-4'>

            <label htmlFor="sort" className='font-medium text-gray-700'>Sort by:</label>
            <select
                name="sortedBy"
                id="sort"
                value={sortValue}
                onChange={onSortChange}
                className='border border-gray-500 rounded-md px-3 py-1'
            >
                <option value="latest">Latest</option>
                <option value="likeCount">Like count</option>
            </select>
            <label htmlFor="limit" className='font-medium text-gray-700'>Posts per page:</label>
            <select
                name="limit"
                id="limit"
                value={limitValue}
                onChange={onLimitChange}
                className='border border-gray-500 rounded-md px-3 py-1'
            >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
            </select>
        </div>
    )
}

export default PaginationFilter