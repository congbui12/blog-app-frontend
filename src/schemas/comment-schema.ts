import * as Yup from 'yup';

const commentSchema = {
  content: Yup.string()
    .transform((value) => (value ? value.trim() : value))
    .min(3, 'Comment must be at least 3-character long')
    .max(500, 'Comment cannot exceed 500 characters'),
};

export const addCommentSchema = Yup.object({
  content: commentSchema.content.required(),
});

export const editCommentSchema = Yup.object({
  content: commentSchema.content,
}).test('at-least-one-field', 'At least 1 field must be provided', (value) =>
  Object.values(value || {}).some((v) => typeof v === 'string' && v.trim().length > 0)
);

export type AddCommentDTO = Yup.InferType<typeof addCommentSchema>;

export type EditCommentDTO = Yup.InferType<typeof editCommentSchema>;
