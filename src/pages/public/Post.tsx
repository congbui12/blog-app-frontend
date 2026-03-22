import Layout from '../../components/layout';
import { useParams } from 'react-router-dom';
import PostDetail from '../../components/features/post/PostDetail';
import AddCommentForm from '../../components/features/comment/AddCommentForm';
import CommentList from '../../components/features/comment/CommentList';
import { useFetchPost } from '../../hooks';

const Post = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useFetchPost(id!);

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center p-10">Loading post...</div>
      </Layout>
    );
  }

  if (isError || !data) {
    return (
      <Layout>
        <div className="text-red-500 p-10 text-center">Post not found.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="w-full flex flex-col gap-4">
        <PostDetail post={data} />
        <AddCommentForm postId={data?._id} />
        <CommentList postId={data?._id} postAuthorId={data?.author._id} />
      </div>
    </Layout>
  );
};

export default Post;
