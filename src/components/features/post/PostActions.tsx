import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import {
  HandThumbUpIcon as LikeOutline,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { HandThumbUpIcon as LikeSolid } from '@heroicons/react/24/solid';
import Button from '../../basics/Button';
import AppAlertDialog from '../../basics/AppAlertDialog';
import { useAuth, useToggleFavorite, useDeletePost } from '../../../hooks';
import type { PostData } from '../../../types';
import { POST_STATUSES } from '../../../constants';

const PostActions = ({ post }: { post: PostData }) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { mutate: toggleFavorite, isPending: pendingToggleFavorite } = useToggleFavorite();
  const { mutate: deletePost } = useDeletePost();

  const canFavorite = post.status === POST_STATUSES.PUBLISHED && user;
  const LikeIcon = post.isFavorited ? LikeSolid : LikeOutline;
  const isAuthor = user?._id === post.author._id;

  return (
    <>
      <div className="sticky top-32 flex flex-col items-center gap-6">
        <Button
          onClick={() => toggleFavorite(post._id)}
          disabled={!canFavorite || pendingToggleFavorite}
          className={clsx(
            'flex flex-col items-center text-sm font-medium',
            !canFavorite && 'opacity-50 cursor-not-allowed',
            post.isFavorited ? 'text-blue-600' : 'text-gray-600'
          )}
        >
          <LikeIcon className={clsx('w-6 h-6', pendingToggleFavorite && 'animate-pulse')} />
          {post.likeCount}
        </Button>

        {isAuthor && (
          <>
            <Button
              className="text-gray-600 hover:text-blue-500"
              onClick={() => navigate(`/posts/${post._id}/edit`)}
            >
              <PencilSquareIcon className="w-6 h-6" />
            </Button>

            <Button
              className="text-gray-600 hover:text-red-500"
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              <TrashIcon className="w-6 h-6" />
            </Button>
          </>
        )}
      </div>
      <AppAlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Are you sure you want to delete this post?"
        onAction={() => {
          deletePost(post._id);
          navigate('/dashboard');
        }}
      />
    </>
  );
};

export default PostActions;
