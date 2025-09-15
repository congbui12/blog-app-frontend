import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import postAPI from '../../api/postAPI';
import { toast } from 'react-toastify';
import PageLayout from '../../layouts/PageLayout';

const PostForm = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (!slug) return;
        const fetchPostData = async () => {
            const res = await postAPI.fetchPostDetailsAPI(slug);
            if (res.ok) {
                setTitle(res.payload.title);
                setContent(res.payload.content);
            } else {
                toast.error(res.message);
            }
        }

        fetchPostData();
    }, [slug])

    const handleUpdatePost = async (e) => {
        e.preventDefault();
        const res = await postAPI.editPostAPI(slug, title, content);
        if (res.ok) {
            const newSlug = res.payload.slug;
            navigate(`/post/${newSlug}`);
            toast.success(res.message);
        } else {
            toast.error(res.message);
        }
    }

    const handleCreatePost = async (e) => {
        e.preventDefault();
        const res = await postAPI.createPostAPI(title, content);
        if (res.ok) {
            navigate('/protected/dashboard');
            toast.success(res.message);
        } else {
            toast.error(res.message);
        }
    }

    const handleCancel = () => {
        navigate(slug ? `/post/${slug}` : '/protected/dashboard');
    }

    return (
        <PageLayout>
            <form className='w-full mx-auto flex flex-col gap-4 border border-gray-500 rounded-xl p-4'>
                <h1 className='text-start text-xl text-blue-500 font-bold md:text-center'>{slug ? 'Update post' : 'Create a new post'}</h1>
                <div className='flex flex-col gap-1'>
                    <label htmlFor='post-title' className='text-blue-500 font-semibold w-1/3'>Title</label>
                    <input id='post-title' type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                        className='w-full border p-2 rounded-md' />
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="post-content" className='text-blue-500 font-semibold w-1/3'>Content</label>
                    <textarea rows={10} id='post-content' type="text" value={content} onChange={(e) => setContent(e.target.value)}
                        className='w-full border p-2 rounded-md' />

                </div>
                <div className='flex gap-4'>
                    <button type='submit' onClick={slug ? handleUpdatePost : handleCreatePost}
                        className='bg-blue-400 text-white px-3 py-1 rounded-md hover:bg-blue-500'>
                        {slug ? 'Update post' : 'Create post'}
                    </button>

                    <button type='button' onClick={handleCancel}
                        className='bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500'>Cancel</button>
                </div>
            </form>

        </PageLayout>
    )
}

export default PostForm