import React, { useState, useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import PageLayout from '../../layouts/PageLayout';
import PostList from '../../components/post/PostList';
import SearchBar from '../../components/search/SearchBar';
import postAPI from '../../api/postAPI';
import SearchModal from '../../components/search/SearchModal';
import Pagination from '../../components/paginition/Pagination';
import PaginationFilter from '../../components/paginition/PaginationFilter';

const Home = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [sortedBy, setSortedBy] = useState('latest');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);

    const [posts, setPosts] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [matchingPosts, setMatchingPosts] = useState(0);

    const fetchPosts = async () => {
        const res = await postAPI.fetchPostsAPI(sortedBy, page, limit);
        if (res.ok) {
            setPosts(res.payload);
            setTotalPages(res.meta.totalPages);
        }
    }

    useEffect(() => {
        fetchPosts();
    }, [sortedBy, page, limit]);

    const handleSortChange = (e) => {
        const newSort = e.target.value;
        setSortedBy(newSort);
        setSearchParams({ sortedBy: newSort, page, limit });
    }

    const handleLimitChange = (e) => {
        const newLimit = parseInt(e.target.value);
        setPage(1);
        setLimit(newLimit);
        setSearchParams({ sortedBy, page: 1, limit: newLimit });
    }

    const handlePageChange = (newPage) => {
        setPage(newPage);
        setSearchParams({ sortedBy, page: newPage, limit });
    }

    const handleSearch = (query) => {
        const encodedQuery = encodeURIComponent(query);
        setSearchParams({ search: encodedQuery });
        setIsModalOpen(true);
    }

    const query = searchParams.get('search');

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (query) {
                const decodedQuery = decodeURIComponent(query);
                setSearchQuery(decodedQuery);
                const res = await postAPI.searchPostAPI(decodedQuery);
                if (res.ok) {
                    setIsModalOpen(true);
                    setFilteredPosts(res.payload);
                    setMatchingPosts(res.meta.totalMatching);
                }
            } else {
                setIsModalOpen(false);
            }
        }

        fetchSearchResults();
    }, [query]);

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSearchParams({});
    }

    return (
        <PageLayout>
            <div className='flex flex-col gap-4'>
                <SearchBar onSearchSubmit={handleSearch} />
                {isModalOpen && <SearchModal keyword={searchQuery} number={matchingPosts} results={filteredPosts} onClose={handleCloseModal} />}

                <PaginationFilter
                    sortValue={sortedBy}
                    onSortChange={handleSortChange}
                    limitValue={limit}
                    onLimitChange={handleLimitChange} />

                <PostList posts={posts} />

                <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
        </PageLayout>

    );
}

export default Home;