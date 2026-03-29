import { useSearchParams } from 'react-router-dom';
import Layout from '../components/layout';
import PostList from '../components/features/post/PostList';
import { usePosts } from '../hooks';

const Home = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';
  const limit = searchParams.get('limit') || '5';
  const { data, isLoading, isPlaceholderData } = usePosts({ page, limit });
  return (
    <Layout>
      <div
        className={`transition-opacity duration-200 ${isPlaceholderData ? 'opacity-50' : 'opacity-100'}`}
      >
        <PostList posts={data?.posts ?? []} totalPages={(data?.meta.totalPages as number) ?? 0} />
      </div>
      {isLoading && !data && <div className="text-center py-10">Loading posts...</div>}
    </Layout>
  );
};

export default Home;
