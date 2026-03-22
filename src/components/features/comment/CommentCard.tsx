import { useState } from 'react';
import { EllipsisVerticalIcon, PencilIcon, TrashIcon } from 'lucide-react';
import Button from '../../basics/Button';
import { useAuth, useDeleteComment } from '../../../hooks';
import { isEdited, getTimeDistance } from '../../../utils/helper';
import type { Comment } from '../../../types';
import DropdownList from '../../basics/DropdownList';
import DropdownItem from '../../basics/DropdownItem';
import AppAlertDialog from '../../basics/AppAlertDialog';

interface CommentCardProps {
  comment: Comment;
  postAuthorId: string;
  onToggleEdit: () => void;
}

const CommentCard = ({ comment, postAuthorId, onToggleEdit }: CommentCardProps) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { user } = useAuth();
  const { mutate } = useDeleteComment();

  const isCommentEdited = isEdited(comment.createdAt, comment.updatedAt);
  const postedOn = getTimeDistance(comment.createdAt);

  const isCommentOwner = user && user._id.toString() === comment.user._id.toString();
  const isPostAuthor = user && user._id.toString() === postAuthorId.toString();

  const canEdit = isCommentOwner;
  const canDelete = isCommentOwner || isPostAuthor;
  const showOptions = canEdit || canDelete;

  const handleDeleteComment = () => {
    mutate(
      { commentId: comment._id, postId: comment.post },
      {
        onSuccess: () => {
          setIsDeleteDialogOpen(false);
        },
        // onError: (error) => {
        //   console.log(error);
        //   setIsDeleteDialogOpen(false);
        // },
      }
    );
  };

  return (
    <>
      <div className="w-3/4 border border-gray-200 rounded-lg bg-white shadow-sm p-4 space-y-3">
        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-900">{comment.user.username}</span>

          <span className="text-xs text-gray-400 font-light">{postedOn}</span>

          {isCommentEdited && (
            <span className="text-[10px] uppercase font-medium text-gray-400">(Edited)</span>
          )}
        </div>

        <p className="text-gray-700 leading-relaxed">{comment.content}</p>

        <div className="flex items-center gap-3 pt-1">
          {showOptions && (
            <DropdownList trigger={<EllipsisVerticalIcon className="w-4 h-4" />}>
              {canEdit && (
                <DropdownItem>
                  <Button
                    onClick={onToggleEdit}
                    className="
                    inline-flex items-center p-1.5 rounded
                    border-none
                    bg-transparent
                    hover:bg-emerald-100
                    transition
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-emerald-500
                    focus-visible:ring-offset-2
                    cursor-pointer
                  "
                  >
                    <PencilIcon className="w-4 h-4" />
                  </Button>
                </DropdownItem>
              )}
              {canDelete && (
                <DropdownItem>
                  <Button
                    onClick={() => setIsDeleteDialogOpen(true)}
                    className="
                    inline-flex items-center p-1.5 rounded
                    border-none
                    bg-transparent
                    hover:bg-rose-100
                    transition
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-rose-500
                    focus-visible:ring-offset-2
                    cursor-pointer
                  "
                  >
                    <TrashIcon className="w-4 h-4" />
                  </Button>
                </DropdownItem>
              )}
            </DropdownList>
          )}
        </div>
      </div>
      <AppAlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Delete comment"
        description="Are you sure you want to delete this comment"
        onAction={handleDeleteComment}
      />
    </>
  );
};

export default CommentCard;
