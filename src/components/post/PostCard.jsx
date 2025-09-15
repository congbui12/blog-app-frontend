import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import helper from "../../services/helper";
import { useAuth } from "../../contexts/AuthContext";
import postAPI from '../../api/postAPI';

const PostCard = ({ post, isSummary }) => {
    if (!post) return <p>Loading...</p>

    const { user } = useAuth();

    const isPostEdited = helper.isEdited(post.createdAt, post.updatedAt);

    const postedOn = helper.formatDate(post.createdAt, 'MMMM dd, yyyy');
    const editedOn = helper.formatDate(post.updatedAt, 'MMMM dd, yyyy');

    const [like, setLike] = useState(0);
    const [isFavorited, setIsFavorited] = useState(false);

    useEffect(() => {
        if (post) {
            setLike(parseInt(post.likeCount) || 0);
            setIsFavorited(!!post.isFavorited);
        }
    }, [post]);

    const handleAddFavorite = async (slug) => {
        const res = await postAPI.addPostToFavoritesAPI(slug);
        if (res.ok) {
            setLike((prev) => prev + 1);
            setIsFavorited(true);
        }
    }

    const handleRemoveFavorite = async (slug) => {
        const status = await postAPI.removePostFromFavoritesAPI(slug);
        if (status === 204) {
            setLike((prev) => prev - 1);
            setIsFavorited(false);
        }
    }

    return (
        <div
            key={post._id}
            className='w-full border border-gray-500 rounded-xl p-4 flex flex-col space-y-2 shadow-md'
        >
            <p className='font-semibold'>{post.userId.username}</p>
            <p className='text-sm text-gray-500'>
                Posted on {postedOn}
                {/* {isSummary && isPostEdited && <span className='ml-2 italic text-gray-400'>(Edited)</span>} */}
            </p>
            {/* {!isSummary && isPostEdited && <p className='text-sm italic text-gray-400'>Edited on {editedOn}</p>} */}
            <h1 className='text-xl font-bold'>{post.title}</h1>
            {!isSummary && <p className='text-gray-700'>{post.content}</p>}
            {isSummary && <p className='text-blue-600'>Like<span className='ml-2'>{post.likeCount}</span></p>}

            {(!isSummary && user)
                && <button
                    onClick={() => isFavorited ? handleRemoveFavorite(post.slug) : handleAddFavorite(post.slug)}
                    className={`w-20 px-3 py-1 rounded-md font-bold border border-gray-500 hover:bg-blue-500 hover:text-white transition ${isFavorited ? 'bg-blue-500 text-white' : 'bg-white text-black '}`}
                >Like <span>{like}</span></button>}

            {isSummary && <Link to={`/post/${post.slug}`} className='text-blue-500 underline'>Read More</Link>}
        </div>
    )
}

export default PostCard;