import { Link } from 'react-router-dom';
import clsx from 'clsx';
import {
  HandThumbUpIcon as HandThumbUpOutline,
  GlobeAltIcon,
  LockClosedIcon,
} from '@heroicons/react/24/outline';
import { HandThumbUpIcon as HandThumbUpSolid } from '@heroicons/react/24/solid';
import { formatDate } from '../../../utils/helper';
import { useAuth, useToggleFavorite } from '../../../hooks';
import type { PostItem } from '../../../types';
import { POST_STATUSES } from '../../../constants';
import { Card, Flex, Text, Box, Heading, Button } from '@radix-ui/themes';

const PostCard = ({ post }: { post: PostItem }) => {
  const { user } = useAuth();
  const { mutate, isPending } = useToggleFavorite();

  const postedOn = formatDate(post.createdAt, 'MMMM dd, yyyy');
  const canFavorite = post.status === POST_STATUSES.PUBLISHED && user;

  const LikeIcon = post.isFavorited ? HandThumbUpSolid : HandThumbUpOutline;

  return (
    <Card size="2" className="w-full shadow-md bg-white">
      <Flex direction="column" gap="2">
        <Flex direction="column" gap="1">
          <Text as="p" size="2" weight="bold" color="gray">
            {post.author.username}
          </Text>
          <Flex align="center" gap="2">
            <Text size="1" color="gray">
              Posted on {postedOn}
            </Text>
            <Box>
              {post.status === POST_STATUSES.PUBLISHED ? (
                <GlobeAltIcon className="w-3.5 h-3.5 opacity-70" />
              ) : (
                <LockClosedIcon className="w-3.5 h-3.5 opacity-70" />
              )}
            </Box>
          </Flex>
        </Flex>

        <Heading as="h2" size="4" className="leading-snug line-clamp-2 wrap-break-word">
          <Link
            to={`/posts/${post._id}`}
            className="text-blue-600 hover:underline decoration-1 underline-offset-4"
          >
            {/* Check if _formatted exists (it only exists in search results) */}
            {post._formatted?.title ? (
              <span dangerouslySetInnerHTML={{ __html: post._formatted.title }} />
            ) : (
              post.title
            )}
          </Link>
        </Heading>
        <Box>
          <Button
            type="button"
            variant="ghost"
            color={post.isFavorited ? 'blue' : 'gray'}
            loading={isPending}
            disabled={!canFavorite}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              mutate(post._id);
            }}
            className="cursor-pointer -ml-2"
          >
            <LikeIcon className={clsx('w-5 h-5', isPending && 'animate-pulse')} />
            <Text size="2" weight="medium">
              {post.likeCount}
            </Text>
          </Button>
        </Box>
      </Flex>
    </Card>
  );
};

export default PostCard;
