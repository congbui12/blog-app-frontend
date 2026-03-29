import { useState } from 'react';
import { useComments } from '../../../hooks';
import CommentItem from './CommentItem';
import CommentSortMenu from './CommentSortMenu';
import { Text, Flex, Button } from '@radix-ui/themes';
import AppSpinner from '../../basics/AppSpinner';
import type { LazyParams } from '../../../types';

interface CommentListProps {
  postId: string;
  postAuthorId: string;
}

const CommentList = ({ postId, postAuthorId }: CommentListProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [params, setParams] = useState<LazyParams>({
    sortOrder: 'desc',
    limit: 3,
  });

  const { comments, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useComments(
    postId,
    params
  );

  if (isLoading) {
    return <AppSpinner label="Loading comments..." />;
  }

  if (comments.length === 0) {
    return (
      <Text as="p" align="center" color="gray" size="2" className="italic mt-4">
        No comments available
      </Text>
    );
  }

  return (
    <Flex direction="column" gap="4" className="w-full">
      <Flex justify="start" className="w-full md:w-3/4 mx-auto">
        <CommentSortMenu
          sort={params.sortOrder ?? 'desc'}
          onSortChange={(newSort) => setParams((prev) => ({ ...prev, sortOrder: newSort }))}
        />
      </Flex>

      <Flex direction="column" gap="4">
        {comments.map((comment) => (
          <CommentItem
            key={comment._id}
            comment={comment}
            postAuthorId={postAuthorId}
            isEditing={editingId === comment._id}
            onToggleEdit={() => setEditingId(comment._id)}
            onCancelEdit={() => setEditingId(null)}
          />
        ))}

        {hasNextPage && (
          <Flex justify="center" className="w-full md:w-3/4 mx-auto">
            <Button
              variant="outline"
              color="gray"
              onClick={() => fetchNextPage()}
              loading={isFetchingNextPage}
              className="cursor-pointer"
            >
              Load more
            </Button>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default CommentList;
