import React, { useState, useEffect } from 'react';
import PageLayout from "../../layouts/PageLayout";
import { useAuth } from '../../contexts/AuthContext';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import postAPI from '../../api/postAPI';
import commentAPI from '../../api/commentAPI';
import PostCard from '../../components/post/PostCard';
import CommentInput from '../../components/comment/CommentInput';
import CommentList from '../../components/comment/CommentList';
import { toast } from 'react-toastify';
import helper from '../../services/helper';

const Post = () => {
    const { user } = useAuth();
    const { slug } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const redirectTo = '/protected/dashboard';

    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);

    const fetchPostDetails = async () => {
        const postResponse = await postAPI.fetchPostDetailsAPI(slug);

        // console.log(postResponse);

        if (!postResponse.ok) {
            toast.error('Load post details error');
        } else {
            setPost(postResponse.payload);
        }
    }

    const fetchComments = async () => {
        const commentsResponse = await commentAPI.getCommentsByPostAPI(slug);

        // console.log(commentsResponse);

        if (!commentsResponse.ok) {
            toast.error('Load comments error');
        } else {
            setComments(commentsResponse.payload);
        }
    }

    useEffect(() => {
        fetchPostDetails();
        fetchComments();
    }, [slug]);

    const handleSubmitComment = async (comment) => {
        const res = await commentAPI.addCommentAPI(slug, comment);
        if (res.ok) {
            fetchComments();
        }
    }

    const handleDeletePost = async () => {
        const status = await postAPI.deletePostAPI(slug);
        if (status === 204) {
            navigate(redirectTo);
        } else {
            toast.error(res.message);
        }
    }

    return (
        <PageLayout>
            <div className='w-full flex flex-col gap-4'>
                {user && post && user._id.toString() === post.userId._id.toString() && (
                    <div className='flex justify-center gap-4 md:justify-end'>
                        <Link
                            to={`/protected/post/${post.slug}/edit`}
                            className='px-3 py-1 block rounded-md bg-green-400 text-white hover:bg-green-500'
                        >Edit this post</Link>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                helper.handleConfirmAction('delete this post', handleDeletePost);
                            }}
                            className='px-3 py-1 rounded-md bg-red-400 text-white hover:bg-red-500'
                        >
                            Delete this post
                        </button>

                    </div>
                )}
                {post && <PostCard post={post} isSummary={false} />}

                {user
                    ? <CommentInput onSubmitComment={handleSubmitComment} />
                    : <Link to='/login'
                        state={{ from: location }}
                        className='text-blue-500 underline text-start'
                    > Login to comment</Link>}


                <CommentList comments={comments} reFecthComments={fetchComments} />
            </div>

        </PageLayout>
    )
}

export default Post