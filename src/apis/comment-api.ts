import type { LazyParams, Comment } from '../types';
import { COMMENT_BY_POST, COMMENT_ITEM } from '../constants';
import { getRequest, postRequest, patchRequest, deleteRequest } from '../utils/axios/helper';
import {
  addCommentSchema,
  type AddCommentDTO,
  editCommentSchema,
  type EditCommentDTO,
} from '../schemas';
import { validateSchema } from '../utils/helper';

export const listCommentsOfPost = (postId: string, query: LazyParams) => {
  const url = COMMENT_BY_POST(postId);
  return getRequest<Comment[]>(url, { params: query });
};

export const addComment = async (postId: string, dto: AddCommentDTO) => {
  const url = COMMENT_BY_POST(postId);
  const validatedDTO = await validateSchema(addCommentSchema, dto);
  return postRequest<Comment>(url, validatedDTO);
};

export const editComment = async (commentId: string, dto: EditCommentDTO) => {
  const url = COMMENT_ITEM(commentId);
  const validatedDTO = await validateSchema(editCommentSchema, dto);
  return patchRequest<Comment>(url, validatedDTO);
};

export const deleteComment = (commentID: string) => {
  const url = COMMENT_ITEM(commentID);
  return deleteRequest<void>(url);
};
