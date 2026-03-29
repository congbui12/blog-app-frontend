import {
  useQueryClient,
  useInfiniteQuery,
  type InfiniteData,
  type QueryKey,
  useMutation,
} from '@tanstack/react-query';
import { listCommentsOfPost, addComment, editComment, deleteComment } from '../apis';
import type { AxiosResponse } from 'axios';
import type { LazyParams, ApiSuccessResponse, Comment } from '../types';
import type { AddCommentDTO, EditCommentDTO } from '../schemas';

export const useComments = (postId: string, params: LazyParams) => {
  const query = useInfiniteQuery<
    AxiosResponse<ApiSuccessResponse<Comment[]>>, // TQueryFnData
    Error, // TError
    InfiniteData<AxiosResponse<ApiSuccessResponse<Comment[]>>>, // TData
    QueryKey, // TQueryKey
    string | null // TPageParam
  >({
    queryKey: ['comments', postId, params],
    initialPageParam: null as string | null,
    queryFn: ({ pageParam }: { pageParam: string | null }) =>
      listCommentsOfPost(postId, { ...params, cursor: pageParam }),
    getNextPageParam: (lastPage) => {
      const meta = lastPage.data.meta;
      return meta?.hasMore ? (meta?.nextCursor as string | null) : null;
    },
    enabled: Boolean(postId),
  });

  const comments = query.data?.pages.flatMap((page) => page.data.payload ?? []) ?? [];

  return {
    ...query,
    comments,
  };
};

export const useAddComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, dto }: { postId: string; dto: AddCommentDTO }) =>
      addComment(postId, dto),
    onSuccess: (_response, variables) => {
      // TODO: implement "GHOST COMMENT" logic
      // const newComment = response.data.payload;
      // if (!newComment) {
      //   return;
      // }
      // queryClient.setQueryData<InfiniteData<AxiosResponse<ApiSuccessResponse<Comment[]>>>>(['comments', variables.postId], (oldData) => {
      //   if (!oldData) {
      //     return oldData;
      //   }
      //   return {
      //     ...oldData,
      //     pages: oldData.pages.map((page, index) => {
      //       return (index === 0) ? ({...page,
      //       data: {
      //         ...page.data,
      //         payload: [newComment, ...(page.data.payload || [])]
      //       }}) : page;

      //     })
      //   };
      // });
      queryClient.invalidateQueries({ queryKey: ['comments', variables.postId] });
    },
  });
};

export const useEditComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ commentId, dto }: { commentId: string; dto: EditCommentDTO; postId: string }) =>
      editComment(commentId, dto),
    onSuccess: (response, variables) => {
      const updatedComment = response.data.payload;
      if (!updatedComment) {
        return;
      }
      queryClient.setQueryData<InfiniteData<AxiosResponse<ApiSuccessResponse<Comment[]>>>>(
        ['comments', variables.postId],
        (oldData) => {
          if (!oldData) {
            return oldData;
          }
          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              data: {
                ...page.data,
                payload: page.data.payload?.map((c) =>
                  c._id === variables.commentId ? updatedComment : c
                ),
              },
            })),
          };
        }
      );
      queryClient.invalidateQueries({ queryKey: ['comments', variables.postId] });
    },
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ commentId }: { commentId: string; postId: string }) => deleteComment(commentId),
    onSuccess: (_, variables) => {
      queryClient.setQueryData<InfiniteData<AxiosResponse<ApiSuccessResponse<Comment[]>>>>(
        ['comments', variables.postId],
        (oldData) => {
          if (!oldData) {
            return oldData;
          }
          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              data: {
                ...page.data,
                payload: page.data.payload?.filter((c) => c._id !== variables.commentId),
              },
            })),
          };
        }
      );
      queryClient.invalidateQueries({ queryKey: ['comments', variables.postId] });
    },
  });
};
