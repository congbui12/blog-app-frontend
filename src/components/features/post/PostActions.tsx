import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  HandThumbUpIcon as LikeOutline,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { HandThumbUpIcon as LikeSolid } from '@heroicons/react/24/solid';
import { Flex, IconButton, Text } from '@radix-ui/themes';
import AppAlertDialog from '../../basics/AppAlertDialog';
import { useAuth, useToggleFavorite, useDeletePost } from '../../../hooks';
import type { PostData } from '../../../types';
import { POST_STATUSES } from '../../../constants';

const PostActions = ({ post }: { post: PostData }) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { mutate: toggleFavorite, isPending } = useToggleFavorite();
  const { mutate: deletePost } = useDeletePost();

  const canFavorite = post.status === POST_STATUSES.PUBLISHED && user;
  const LikeIcon = post.isFavorited ? LikeSolid : LikeOutline;
  const isAuthor = user?._id === post.author._id;

  return (
    <>
      <Flex direction="column" align="center" gap="5" className="sticky top-32">
        <Flex direction="column" align="center" gap="1">
          <IconButton
            size="3"
            variant={post.isFavorited ? 'soft' : 'ghost'}
            onClick={() => toggleFavorite(post._id)}
            loading={isPending}
            disabled={!canFavorite}
            color={post.isFavorited ? 'blue' : 'gray'}
            className="cursor-pointer"
            highContrast={post.isFavorited}
          >
            <LikeIcon className="w-5 h-5" />
          </IconButton>
          <Text size="1" weight="medium" color="gray">
            {post.likeCount}
          </Text>
        </Flex>

        {isAuthor && (
          <>
            <IconButton
              size="3"
              variant="ghost"
              color="green"
              className="cursor-pointer"
              onClick={() => navigate(`/posts/${post._id}/edit`)}
            >
              <PencilSquareIcon className="w-6 h-6" />
            </IconButton>

            <IconButton
              size="3"
              variant="ghost"
              color="red"
              className="cursor-pointer"
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              <TrashIcon className="w-6 h-6" />
            </IconButton>
          </>
        )}
      </Flex>
      <AppAlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Delete post"
        description="Are you sure you want to delete this post?"
        onAction={() => {
          deletePost(post._id);
          navigate('/dashboard');
        }}
      />
    </>
  );
};

export default PostActions;
