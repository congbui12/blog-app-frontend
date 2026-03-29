import { usePosts, useAuth } from '../../hooks';
import PostList from '../../components/features/post/PostList';

const PersonalPosts = () => {
  const { user } = useAuth();
  const { data } = usePosts({ author: user?._id });
  return <PostList posts={data?.posts ?? []} totalPages={(data?.meta.totalPages as number) ?? 0} />;
};

export default PersonalPosts;
