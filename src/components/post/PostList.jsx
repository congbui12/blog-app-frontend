import React from 'react';
import PostCard from './PostCard';

const PostList = ({ posts }) => {
    const postArray = Array.isArray(posts) ? posts : [];
    return (
        <div className='w-full flex flex-col gap-4'>
            {postArray.length === 0 ? (
                <p className='text-gray-700 italic'>No posts found</p>
            ) : (
                postArray.map(post => <PostCard key={post._id} post={post} isSummary={true} />)
            )}
        </div>
    )
}

export default PostList;