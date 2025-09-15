import React from 'react';
import PostList from '../post/PostList';
import Modal from 'react-modal';

const SearchModal = ({ keyword, number, results, onClose }) => {
    return (
        <Modal
            isOpen={true}
            onRequestClose={onClose}
            contentLabel='Search results'
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                content: {
                    background: 'white',
                    padding: '20px',
                    borderRadius: '8px',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                    margin: '0 auto',
                    position: 'relative',
                    top: '10px',
                    maxHeight: '75vh',
                    overflowY: 'auto',
                }
            }}
            className='relative w-3xl'
            overlayClassName='fixed inset-0'
        >
            <div>
                <div className='p-4 rounded-lg shadow-lg'>
                    <p className='text-xl text-gray-700 mb-4'>Search results for <span className='font-bold italic'>{keyword}</span>: {number} posts</p>
                    <div className='overflow-y-auto'>
                        <PostList posts={results} />

                    </div>
                    <button
                        onClick={onClose}
                        className='absolute top-0 right-0 text-2xl font-bold text-gray-500 hover:text-gray-800'
                    >&times;</button>
                </div>
            </div>

        </Modal>

    )
}

export default SearchModal