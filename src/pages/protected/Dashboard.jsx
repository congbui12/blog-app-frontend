import React, { useState } from 'react';
import PageLayout from "../../layouts/PageLayout";
import userAPI from '../../api/userAPI';
import PostList from "../../components/post/PostList";
import { useAuth } from '../../contexts/AuthContext';
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link, useLocation } from 'react-router-dom';

const Dashboard = () => {
    const [view, setView] = useState('myPosts');
    const [sortedBy, setSortedBy] = useState('latest');
    const { user } = useAuth();
    const location = useLocation();

    const loadPostList = async (page = 1) => {
        // console.log('Fetching posts page:', page);
        if (!user) return;
        const res = view === 'myPosts' ? await userAPI.fetchMyPostsAPI(sortedBy, page, 3) : await userAPI.fetchFavoritePostsAPI(page, 3);
        return res;
    }

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isLoading,
        isError,
        error
    } = useInfiniteQuery({
        queryKey: ['myPosts', sortedBy, view],
        queryFn: ({ pageParam = 1 }) => loadPostList(pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) => {
            return lastPage?.meta?.hasMore ? pages.length + 1 : undefined;
        },
    })

    const handleViewChange = (newView) => {
        setView(newView);
        // Reset sort only when leaving 'myPosts'
        if (newView !== 'myPosts') {
            setSortedBy('latest');
        }
    }

    const handleSortChange = (e) => {
        setSortedBy(e.target.value);

    }

    if (isLoading) return <p className='text-center font-bold text-gray-700'>Loading posts...</p>;
    if (isError) return <p className='text-center font-bold text-gray-700'>Error: {error?.message}</p>;
    const posts = data?.pages?.flatMap((page) => page.payload) || [];

    const viewClass = (currentView) => `px-3 py-1 border border-gray-500 rounded-md 
    ${view === currentView ? 'bg-blue-500 text-white' : 'bg-white text-gray-500 hover:bg-gray-200'}`;

    return (
        <PageLayout>
            <Link to='/protected/post/new' state={{ from: location }}
                className='block text-center text-lg font-semibold text-gray-700 md:text-end hover:text-blue-500 mb-4'>Share your story✍️</Link>
            <div className='flex flex-col items-center justify-center gap-2 md:flex-row mb-4'>
                {/* Buttons to switch between components */}
                <button onClick={() => handleViewChange('myPosts')}
                    className={viewClass('myPosts')}>My posts</button>
                <button onClick={() => handleViewChange('favoritePosts')}
                    className={viewClass('favoritePosts')}>My favorite posts</button>

            </div>
            <div>
                {view === 'myPosts' && (

                    <div className='flex flex-col md:flex-row items-center justify-center gap-4 mb-4'>
                        <label htmlFor="sort-select" className='font-medium text-gray-700'>Sorted by:</label>
                        <select value={sortedBy} id="sort-select" onChange={handleSortChange}
                            className='border border-gray-500 rounded-md px-3 py-1'>
                            <option value='latest' >Latest</option>
                            <option value='likeCount'>Like count</option>
                        </select>

                    </div>

                )}

                <InfiniteScroll
                    dataLength={posts.length}
                    next={fetchNextPage}
                    hasMore={hasNextPage}
                    loader={<p className='mt-4 text-center font-bold text-gray-700'>Loading more posts</p>}
                    endMessage={<p className='mt-4 text-center font-bold text-gray-700'>All posts loaded</p>}>
                    <PostList posts={posts} />
                </InfiniteScroll>

                {isLoading && <p className='mt-4 text-center font-bold text-gray-700'>Loading more posts...</p>}
                {(isError || data?.ok === false) && <p className='mt-4 text-center font-bold text-gray-700'>Error: {error?.message || data.message}</p>}
            </div>

        </PageLayout>

    )
}

export default Dashboard