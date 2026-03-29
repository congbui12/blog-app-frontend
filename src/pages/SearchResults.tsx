import { useSearchParams } from 'react-router-dom';
import { useSearchPosts } from '../hooks';
import Layout from '../components/layout';
import PostList from '../components/features/post/PostList';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const term = searchParams.get('term') || '';
  const limit = searchParams.get('limit') || '5';

  const { data, isLoading } = useSearchPosts({ term, limit }, !!term);

  return (
    <Layout>
      <div className="mb-5">
        <p className="text-sm font-bold italic">
          {isLoading
            ? 'Searching...'
            : `About ${(data?.meta.totalPages as number) ?? 0} results for "${term}"`}
        </p>
      </div>
      <PostList posts={data?.posts ?? []} totalPages={(data?.meta.totalPages as number) ?? 0} />
    </Layout>
  );
};

export default SearchResults;
