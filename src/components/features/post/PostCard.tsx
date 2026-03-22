import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { HandThumbUpIcon as HandThumbUpOutline } from '@heroicons/react/24/outline';
import { HandThumbUpIcon as HandThumbUpSolid } from '@heroicons/react/24/solid';
import { formatDate } from '../../../utils/helper';
import { useAuth, useToggleFavorite } from '../../../hooks';
import type { PostItem } from '../../../types';
import { POST_STATUSES } from '../../../constants';
import Button from '../../basics/Button';

const PostCard = ({ post }: { post: PostItem }) => {
  const { user } = useAuth();
  const { mutate, isPending } = useToggleFavorite();

  const postedOn = formatDate(post.createdAt, 'MMMM dd, yyyy');
  const canFavorite = post.status === POST_STATUSES.PUBLISHED && user;

  const LikeIcon = post.isFavorited ? HandThumbUpSolid : HandThumbUpOutline;

  return (
    <div className="w-full border border-gray-500 rounded-xl p-4 flex flex-col space-y-2 shadow-md bg-white">
      <p className="font-semibold text-gray-700">{post.author.username}</p>
      <p className="text-sm text-gray-500">Posted on {postedOn}</p>

      <h2 className="text-lg font-bold leading-snug line-clamp-2 wrap-break-word">
        <Link to={`/posts/${post._id}`} className="text-blue-600 hover:underline">
          {/* Check if _formatted exists (it only exists in search results) */}
          {post._formatted?.title ? (
            <span dangerouslySetInnerHTML={{ __html: post._formatted.title }} />
          ) : (
            post.title
          )}
        </Link>
      </h2>

      <Button
        type="button" // Specify type='button' to prevent form submissions
        disabled={!canFavorite || isPending}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          mutate(post._id);
        }}
        className={clsx(
          'flex items-center space-x-2',
          // Reset defaults (Removes the 'box' look)
          'bg-transparent border-none p-0 outline-none shadow-none',
          !canFavorite ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
          post.isFavorited ? 'text-blue-500' : 'text-gray-600'
        )}
      >
        <LikeIcon className={clsx('w-6 h-6', isPending && 'animate-pulse')} />
        <span className="font-medium">{post.likeCount}</span>
      </Button>
    </div>
  );
};

export default PostCard;
