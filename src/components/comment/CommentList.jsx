import React, { useState } from 'react';
import CommentCard from './CommentCard';
import commentAPI from '../../api/commentAPI';
import helper from "../../services/helper";
import { useParams } from 'react-router-dom';
import CommentInput from './CommentInput';

const CommentList = ({ comments, reFecthComments }) => {
    const { slug } = useParams();
    const [editingCommentId, setEditingCommentId] = useState(null);
    const commentArray = Array.isArray(comments) ? comments : [];

    const handleSaveEdit = async (id, newContent) => {
        const response = await commentAPI.editCommentAPI(id, newContent);
        setEditingCommentId(null);
        if (response.ok) {
            reFecthComments(slug);
        }
    }

    const handleToggleEdit = (id) => {
        setEditingCommentId(id);
    }

    const handleDelete = async (id) => {
        const status = await commentAPI.deleteCommentAPI(id);
        if (status === 204) {
            reFecthComments(slug);
        }
    }

    return (
        <div
            className='w-full'
        >
            {commentArray.length === 0
                ? <div className='text-gray-700 italic'>No comments found</div>
                : <div className='flex flex-col space-y-4'>
                    {commentArray.map(comment => (
                        (editingCommentId && editingCommentId.toString() === comment._id.toString())
                            ?
                            (
                                <div key={comment._id} className='flex gap-2 items-start'>
                                    <CommentInput
                                        onSubmitComment={(newContent) => handleSaveEdit(comment._id, newContent)}
                                        initialContent={comment.content}
                                    />
                                    <button
                                        onClick={() => setEditingCommentId(null)}
                                        className='px-3 py-1 rounded-md  text-white bg-gray-400 hover:bg-gray-500 transition'
                                    >Cancel</button>
                                </div>
                            )
                            : (
                                <CommentCard
                                    key={comment._id}
                                    comment={comment}
                                    handleToggleEdit={() => handleToggleEdit(comment._id)}
                                    handleDelete={() => helper.handleConfirmAction('delete comment', () => handleDelete(comment._id))}
                                />
                            )

                    ))}
                </div>}
        </div>
    )
}

export default CommentList