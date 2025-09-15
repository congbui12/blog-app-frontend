import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import helper from '../../services/helper';

const CommentCard = ({ comment, handleToggleEdit, handleDelete }) => {
    const { user } = useAuth();
    if (!comment) return <div>Loading...</div>

    const isCommentEdited = helper.isEdited(comment.createdAt, comment.updatedAt);

    const postedOn = helper.getTimeDistance(comment.createdAt);

    const isCommentOwner = user && (user._id.toString() === comment.userId._id.toString());

    const onToggleEdit = (id) => {
        handleToggleEdit(id);
    }

    const onDelete = (id) => {
        handleDelete(id);
    }

    return (
        <div className='w-full border border-gray-500 rounded-md bg-white shadow-md flex flex-col p-2 space-y-2'>
            <div className='flex items-center justify-start gap-2'>
                <span className='font-semibold text-gray-800'>{comment.userId.username}</span>
                {isCommentEdited && <span className='text-xs italic text-gray-500'>(Edited)</span>}
                {isCommentOwner && (
                    <>
                        <span
                            onClick={() => onToggleEdit(comment._id)}
                            className='text-green-400 hover:text-green-500 transition cursor-pointer'
                        >Edit</span>
                        <span
                            onClick={() => onDelete(comment._id)}
                            className='text-red-400 hover:text-red-500 transition cursor-pointer'
                        >Delete</span>
                    </>


                )}
            </div>
            <p className='text-gray-700'>{comment.content}</p>



            <p className='text-xs text-gray-500'>{postedOn}</p>


        </div>
    )
}

export default CommentCard