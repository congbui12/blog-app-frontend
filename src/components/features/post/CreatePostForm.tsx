import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { type CreatePostDTO, createPostSchema } from '../../../schemas';
import InputField from '../../basics/InputField';
import RHFLexicalField from '../editor/RHFLexicalField';
import { createEmptyDocument } from '../../../utils/editor';

const CreatePostForm = () => {
  const { control, handleSubmit } = useForm<CreatePostDTO>({
    resolver: yupResolver(createPostSchema),
    defaultValues: { title: '', status: 'draft', content: createEmptyDocument() },
  });

  const onSubmit = (data: CreatePostDTO) => {
    // data.content is already a valid LexicalDocument object
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField control={control} name="title" label="Title" />
      <RHFLexicalField control={control} name="content" label="Content" />
      <button type="submit">Save</button>
    </form>
  );
};

export default CreatePostForm;
