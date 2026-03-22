import type { Comment } from '../../../types';
import EditCommentForm from './EditCommentForm';
import CommentCard from './CommentCard';

interface CommentItemProps {
  comment: Comment;
  onCancelEdit: () => void;
  postAuthorId: string;
  isEditing: boolean;
  onToggleEdit: () => void;
}

const CommentItem = (props: CommentItemProps) => {
  if (props.isEditing) {
    return (
      <EditCommentForm
        commentId={props.comment._id}
        postId={props.comment.post}
        initialContent={props.comment.content}
        onCancel={props.onCancelEdit}
      />
    );
  }
  return (
    <CommentCard
      comment={props.comment}
      postAuthorId={props.postAuthorId}
      onToggleEdit={props.onToggleEdit}
    />
  );
};

export default CommentItem;
