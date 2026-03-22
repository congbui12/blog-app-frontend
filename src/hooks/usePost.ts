import {
  type QueryKey,
  useQuery,
  useQueryClient,
  useMutation,
  keepPreviousData,
} from '@tanstack/react-query';
import type {
  ApiSuccessResponse,
  PostItem,
  PostsData,
  PostData,
  PostListParams,
  PostSearchParams,
  PaginationParams,
} from '../types';
import {
  listPosts,
  searchPost,
  listFavorites,
  getPost,
  createPost,
  editPost,
  deletePost,
  toggleFavorite,
} from '../apis';
import type { AxiosResponse } from 'axios';
import type { EditPostDTO } from '../schemas';

export const usePosts = (params: PostListParams) => {
  return useQuery<
    AxiosResponse<ApiSuccessResponse<PostItem[]>>, // TQueryFnData
    Error, // TError
    PostsData, // TData
    QueryKey // TQueryKey
  >({
    queryKey: ['posts', 'list', params], 
    queryFn: () => listPosts({
      ...params,
      page: params.page?.toString() || '1',
      limit: params.limit?.toString() || '5'
    }),
    select: (response) => ({
      posts: response.data?.payload ?? [],
      meta: response.data?.meta as Record<string, unknown> ?? {},
    }),
    placeholderData: keepPreviousData, // Keeps Page 1 on screen while Page 2 loads!
  });
};

export const useSearchPosts = (params: PostSearchParams, enabled: boolean = true) => {
  return useQuery<
    AxiosResponse<ApiSuccessResponse<PostItem[]>>, // TQueryFnData
    Error, // TError
    PostsData, // TData
    QueryKey // TQueryKey
  >({
    queryKey: ['posts', 'list', 'search', params],
    queryFn: () => searchPost({
      ...params,
      page: params.page?.toString() || '1',
      limit: params.limit?.toString() || '5'
    }),
    enabled,
    select: (response) => ({
      posts: response.data.payload ?? [],
      meta: response.data?.meta as Record<string, unknown> ?? {},
    }),
    placeholderData: keepPreviousData,
  });
};

export const useFavoritePosts = (params: PaginationParams) => {
  return useQuery<
    AxiosResponse<ApiSuccessResponse<PostItem[]>>, // TQueryFnData
    Error, // TError
    PostsData, // TData
    QueryKey // TQueryKey
  >({
    queryKey: ['posts', 'list', 'favorites', params],
    queryFn: () => listFavorites({
      ...params,
      page: params.page?.toString() || '1',
      limit: params.limit?.toString() || '5'
    }),
    select: (response) => ({
      posts: response.data.payload ?? [],
      meta: response.data?.meta as Record<string, unknown> ?? {},
    }),
    placeholderData: keepPreviousData,
  });
};

export const useFetchPost = (postId: string) => {
  return useQuery({
    queryKey: ['posts', postId],
    queryFn: () => getPost(postId),
    select: (response) => response.data.payload,
    enabled: !!postId,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPost,
    onSuccess: async () => {
      // Invalidate all post lists to ensure the new post shows up
      await queryClient.invalidateQueries({ queryKey: ['posts', 'list'] });
    },
  });
};

export const useEditPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: EditPostDTO }) => editPost(id, dto),
    onSuccess: (response, variables) => {
      const updatedPost = response.data.payload;
      queryClient.setQueryData(['posts', variables.id], updatedPost);
      queryClient.invalidateQueries({ queryKey: ['posts', 'list'] });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePost,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['posts', 'list'] });
    },
  });
};

export const useToggleFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => toggleFavorite(id),
    // Optimistic Update Logic
    onMutate: async (id) => {
      // Cancel any outgoing refetches so they don't overwrite our optimistic update
      await queryClient.cancelQueries({ queryKey: ['posts', id] });
      await queryClient.cancelQueries({ queryKey: ['posts', 'list'] });

      // Snapshot the previous value
      const previousPost = queryClient.getQueryData<PostData>(['posts', id]);

      // Optimistically update to the new value
      if (previousPost) {
        queryClient.setQueryData(['posts', id], {
          ...previousPost,
          likeCount: previousPost.likeCount + (previousPost.isFavorited ? -1 : 1),
          isFavorited: !previousPost.isFavorited,
        });
      }

      queryClient.setQueriesData<PostsData>(
        { queryKey: ['posts', 'list'] },
        (oldData) => {
          if (!oldData || !oldData.posts) {
            return oldData;
          }
          return {
            ...oldData,
            posts: oldData.posts?.map((post) =>
              post._id === id
                ? {
                    ...post,
                    likeCount: post.likeCount + (post.isFavorited ? -1 : 1),
                    isFavorited: !post.isFavorited,
                  }
                : post
            ),
          };
        }
      );

      // Specific fix for the Favorites List - Remove if unfavorited
      queryClient.setQueriesData<PostsData>(
        { queryKey: ['posts', 'list', 'favorites'] }, // Targets only favorite keys
        (oldData) => {
          if (!oldData) {
            return oldData
          };
          // If the post was ALREADY favorited, UNfavoriting it will remove it from the view.
          return {
            ...oldData,
            posts: oldData.posts.filter(post => post._id !== id)
          };
        }
      );

      return { previousPost };
    },
    onError: (error, id, context) => {
      console.error("useToggleFavorite failed: ", error);
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousPost) {
        queryClient.setQueryData(['posts', id], context.previousPost);
      }
    },
    onSettled: (_data, _error, id) => {
      // Refetch to ensure absolute synchronization
      queryClient.invalidateQueries({ queryKey: ['posts', id] });
      queryClient.invalidateQueries({ queryKey: ['posts', 'list'] });
    },
  });
};
