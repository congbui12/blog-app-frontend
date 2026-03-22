import { useState } from 'react';
import { useComments } from '../../../hooks';
import CommentItem from './CommentItem';
import CommentSortMenu from './CommentSortMenu';
import Button from '../../basics/Button';
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
    return <div className="animate-pulse space-y-4">Loading comments...</div>;
  }

  if (comments.length === 0) {
    return <div className="italic text-gray-500">No comments available</div>;
  }

  return (
    <div>
      <CommentSortMenu
        sort={params.sortOrder ?? 'desc'}
        onSortChange={(newSort) => setParams((prev) => ({ ...prev, sortOrder: newSort }))}
      />
      <div className="space-y-4">
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
          <Button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="border px-4 py-2 rounded"
          >
            {isFetchingNextPage ? 'Loading...' : 'Load more'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default CommentList;
