import React, { useState } from 'react';

const SearchBar = ({ onSearchSubmit }) => {
    const [keyword, setKeyword] = useState('');

    const handleSearchChange = (e) => {
        setKeyword(e.target.value);
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setKeyword('');
        if (keyword.trim()) {
            onSearchSubmit(keyword);
        }
    }

    return (
        <div className='max-w-md mx-auto p-4'>
            <form
                onSubmit={handleSearchSubmit}
                className='flex items-center border border-gray-500 rounded-md shadow-md overflow-hidden'>
                <input
                    type="search"
                    value={keyword}
                    required
                    placeholder='Search'
                    onChange={handleSearchChange}
                    className='w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200'
                />
                <button
                    type='submit'
                    className='px-3 py-1'
                >🔍</button>
            </form>

        </div>
    )
}

export default SearchBar