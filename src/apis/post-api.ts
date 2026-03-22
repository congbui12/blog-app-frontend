import type {
  PaginationParams,
  PostListParams,
  PostSearchParams,
  PostItem,
  PostData,
} from '../types';
import { getRequest, postRequest, patchRequest, deleteRequest } from '../utils/axios/helper';
import {
  POST_BASE,
  SEARCH_POST,
  POST_ITEM,
  LIST_FAVORITES_POST,
  TOGGLE_FAVORITE_POST,
} from '../constants';
import { createPostSchema, type CreatePostDTO, editPostSchema, type EditPostDTO } from '../schemas';
import { validateSchema } from '../utils/helper';

export const listPosts = (query: PostListParams) => {
  return getRequest<PostItem[]>(POST_BASE, { params: query });
};

export const searchPost = (query: PostSearchParams) => {
  return getRequest<PostItem[]>(SEARCH_POST, { params: query });
};

export const createPost = async (dto: CreatePostDTO) => {
  const validatedDTO = await validateSchema(createPostSchema, dto);
  return postRequest<Pick<PostItem, '_id'>>(POST_BASE, validatedDTO);
};

export const listFavorites = (query: PaginationParams) => {
  return getRequest<PostItem[]>(LIST_FAVORITES_POST, { params: query });
};

export const getPost = (postId: string) => {
  const url = POST_ITEM(postId);
  return getRequest<PostData>(url);
};

export const editPost = async (postId: string, dto: EditPostDTO) => {
  const url = POST_ITEM(postId);
  const validatedDTO = await validateSchema(editPostSchema, dto);
  return patchRequest<PostData>(url, validatedDTO);
};

export const deletePost = (postId: string) => {
  const url = POST_ITEM(postId);
  return deleteRequest<void>(url);
};

export const toggleFavorite = (postId: string) => {
  const url = TOGGLE_FAVORITE_POST(postId);
  return postRequest<Pick<PostItem, 'likeCount' | 'isFavorited'>>(url);
};
