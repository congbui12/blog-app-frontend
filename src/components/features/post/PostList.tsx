import type { PostItem } from '../../../types';
import PostCard from './PostCard';
import Pagination from '../paginition/Pagination';

interface PostListProps {
  posts: PostItem[];
  totalPages: number;
}

const PostList = ({ posts, totalPages }: PostListProps) => {
  if (!posts.length) {
    return (
      <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50">
        <p className="text-gray-500 font-medium text-lg italic">No posts available.</p>
        <p className="text-gray-400 text-sm mt-1">Check back later for new content.</p>
      </div>
    );
  }
  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 py-4">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center items-center">
          <Pagination totalPages={totalPages} />
        </div>
      )}
    </div>
  );
};

export default PostList;
