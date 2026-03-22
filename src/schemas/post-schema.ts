import * as Yup from 'yup';
import { hasLexicalNode, isLexicalDocument } from '../utils/editor';
import type { SerializedLexicalNode } from 'lexical';
import { POST_STATUSES } from '../constants';

const titleSchema = Yup.string()
  .transform((value) => (value ? value.trim() : value))
  .min(3, 'Title must be at least 3-character long')
  .max(200, 'Title cannot exceed 200 characters');

const contentSchema = Yup.object({
  root: Yup.object({
    type: Yup.string()
      .test('is-root', 'Invalid root type', (val) => val === 'root')
      .required(),
    version: Yup.number().required(),
    children: Yup.array()
      .of(Yup.object())
      .required('Post content cannot be empty')
      .test('is-not-blank', 'Post content cannot be empty', (value): boolean =>
        hasLexicalNode(Array.isArray(value) ? (value as SerializedLexicalNode[]) : undefined)
      ),
  })
    .required()
    .noUnknown(false),
}).test('max-size', 'Post content is too large (max 50KB)', (value) => {
  if (!value) {
    return true;
  }
  const jsonString = JSON.stringify(value as Record<string, unknown>);
  const byteSize = new TextEncoder().encode(jsonString).length;
  return byteSize <= 50_000;
});

const statusSchema = Yup.string().oneOf(Object.values(POST_STATUSES) as string[]);

const postSchema = {
  title: titleSchema,
  content: contentSchema,
  status: statusSchema,
};

export const createPostSchema = Yup.object({
  title: titleSchema.required(),
  content: contentSchema.required(),
  status: statusSchema.required(),
});

export const editPostSchema = Yup.object(postSchema).test(
  'at-least-one-field',
  'At least 1 field must be provided',
  (value) => {
    if (!value) return false;
    return Object.entries(value).some(([key, v]) => {
      if (v === undefined || v === null) {
        return false;
      }
      if (key === 'content' && isLexicalDocument(v)) {
        return hasLexicalNode(v.root.children);
      }
      if (typeof v === 'string') {
        return v.trim().length > 0;
      }
      return true;
    });
  }
);

export type CreatePostDTO = Yup.InferType<typeof createPostSchema>;

export type EditPostDTO = Yup.InferType<typeof editPostSchema>;
