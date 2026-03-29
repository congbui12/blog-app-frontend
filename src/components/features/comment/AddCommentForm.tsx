import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { addCommentSchema, type AddCommentDTO } from '../../../schemas';
import { useAddComment } from '../../../hooks';
import CommentForm from '../form/CommentForm';

interface AddCommentFormProps {
  postId: string;
}

const AddCommentForm = ({ postId }: AddCommentFormProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<AddCommentDTO>({
    resolver: yupResolver(addCommentSchema),
    defaultValues: {
      content: '',
    },
  });

  const { mutate, isPending } = useAddComment();

  const handleAddComment = (data: AddCommentDTO) => {
    mutate(
      { postId, dto: data },
      {
        onSuccess: () => {
          reset();
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  };

  return (
    <CommentForm
      control={control}
      name="content"
      onSubmit={handleSubmit(handleAddComment)}
      isPending={isPending}
      isDisabled={!isDirty}
      placeholder="Post a comment"
      buttonText="Post"
    />
  );
};

export default AddCommentForm;
