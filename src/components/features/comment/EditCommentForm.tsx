import { useForm, type Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { editCommentSchema, type EditCommentDTO } from '../../../schemas';
import CommentForm from '../form/CommentForm';
import { useEditComment } from '../../../hooks';

interface EditCommentFormProps {
  commentId: string;
  postId: string;
  initialContent: string;
  onCancel: () => void;
}

const EditCommentForm = (props: EditCommentFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm<EditCommentDTO>({
    resolver: yupResolver(editCommentSchema) as Resolver<EditCommentDTO>,
    defaultValues: {
      content: props.initialContent,
    },
  });

  const { mutate, isPending } = useEditComment();

  const handleSaveChanges = (data: EditCommentDTO) => {
    mutate(
      { commentId: props.commentId, dto: data, postId: props.postId },
      {
        onSuccess: () => {
          props.onCancel();
        },
        // onError: (error) => {
        //   console.log(error);
        // },
      }
    );
  };
  return (
    <CommentForm
      control={control}
      name="content"
      onCancel={props.onCancel}
      onSubmit={handleSubmit(handleSaveChanges)}
      isDisabled={!isDirty}
      isPending={isPending}
      buttonText="Save"
    />
  );
};

export default EditCommentForm;
