import { POST_STATUSES, POST_SORT_OPTIONS } from '../constants';

export type AtLeastOne<T> = {
  [K in keyof T]: Pick<T, K>;
}[keyof T] &
  Partial<T>;

export interface PaginationParams {
  page?: string;
  limit?: string;
}

export interface PostListParams extends PaginationParams {
  status?: (typeof POST_STATUSES)[keyof typeof POST_STATUSES];
  author?: string;
  sortedBy?: (typeof POST_SORT_OPTIONS)[keyof typeof POST_SORT_OPTIONS];
}

export interface PostSearchParams extends PaginationParams {
  term: string;
  sortedBy?: (typeof POST_SORT_OPTIONS)[keyof typeof POST_SORT_OPTIONS];
}

export interface LazyParams {
  cursor?: string | null;
  limit?: number;
  sortOrder?: 'asc' | 'desc';
}
