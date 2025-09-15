import React, { useState } from 'react';

const CommentInput = ({ onSubmitComment, initialContent = '' }) => {
    const [content, setContent] = useState(initialContent || '');

    const handleSubmitComment = (e) => {
        e.preventDefault();

        if (content.trim()) {
            onSubmitComment(content);
            setContent('');
        }
    }

    return (
        <div className='w-full'>
            <form onSubmit={handleSubmitComment} className='flex flex-row gap-2 items-start'>
                <textarea
                    cols={50}
                    rows={1}
                    value={content}
                    required
                    placeholder='Write a comment...'
                    onChange={(e) => setContent(e.target.value)}
                    className='flex-grow resize-none text-gray-700 bg-white border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 '
                />
                <button
                    type='submit'
                    className='px-3 py-1 bg-blue-400 text-white rounded-md hover:bg-blue-500 transition'
                >Submit</button>
            </form>
        </div>
    )
}

export default CommentInput