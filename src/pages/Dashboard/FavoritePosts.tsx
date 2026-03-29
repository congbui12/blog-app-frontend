import { useFavoritePosts } from '../../hooks';
import PostList from '../../components/features/post/PostList';

const FavoritePosts = () => {
  const { data } = useFavoritePosts({});
  return <PostList posts={data?.posts ?? []} totalPages={(data?.meta.totalPages as number) ?? 0} />;
};

export default FavoritePosts;
