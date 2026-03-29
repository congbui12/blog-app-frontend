import { useState } from 'react';
import { EllipsisVerticalIcon, PencilIcon, TrashIcon } from 'lucide-react';
import { Box, Flex, Text, IconButton } from '@radix-ui/themes';
import { useAuth, useDeleteComment } from '../../../hooks';
import { isEdited, getTimeDistance } from '../../../utils/helper';
import type { Comment } from '../../../types';
import AppDropdownMenu from '../../basics/AppDropdownMenu';
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
      <Box className="w-full md:w-3/4 mx-auto border border-gray-200 rounded-lg bg-white shadow-sm p-4 relative">
        <Flex justify="between" align="start">
          <Flex align="center" gap="2" mb="2">
            <Text weight="bold" size="2" color="gray" highContrast>
              {comment.user.username}
            </Text>

            <Text weight="light" size="1" color="gray">
              {postedOn}
            </Text>

            {isCommentEdited && (
              <Text size="1" color="gray" className="uppercase opacity-60">
                (Edited)
              </Text>
            )}
          </Flex>
          {showOptions && (
            <AppDropdownMenu
              trigger={
                <IconButton variant="ghost" color="gray" size="2" className="cursor-pointer">
                  <EllipsisVerticalIcon className="w-4 h-4" />
                </IconButton>
              }
            >
              {canEdit && (
                <DropdownItem onClick={onToggleEdit} className="cursor-pointer" color="green">
                  <Flex align="center" gap="2">
                    <PencilIcon className="w-3 h-3" /> Edit
                  </Flex>
                </DropdownItem>
              )}
              {canDelete && (
                <DropdownItem
                  onClick={() => setIsDeleteDialogOpen(true)}
                  className="cursor-pointer"
                  color="red"
                >
                  <Flex align="center" gap="2">
                    <TrashIcon className="w-3 h-3" /> Delete
                  </Flex>
                </DropdownItem>
              )}
            </AppDropdownMenu>
          )}
        </Flex>

        <Text as="p" size="2" color="gray" className="leading-relaxed whitespace-pre-wrap">
          {comment.content}
        </Text>
      </Box>
      <AppAlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Delete comment"
        description="Are you sure you want to delete this comment?"
        onAction={handleDeleteComment}
      />
    </>
  );
};

export default CommentCard;
