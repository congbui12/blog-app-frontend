import { POST_STATUSES } from '../constants';
import type { SerializedRootNode } from 'lexical';

export interface User {
  _id: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

// Define the shape of highlighted object
export interface FormattedPost {
  title?: string;
  // Add other searchable fields here if needed
}

export interface PostItem {
  _id: string;
  title: string;
  status: (typeof POST_STATUSES)[keyof typeof POST_STATUSES];
  likeCount: number;
  author: {
    _id: string;
    username: string;
  };
  createdAt: string;
  updatedAt: string;
  isFavorited: boolean;
  // Property added by MeiliSearch during search
  _formatted?: FormattedPost;
}

export interface PostsData {
  posts: PostItem[];
  meta: Record<string, unknown>;
}

export type LexicalDocument = {
  root: SerializedRootNode;
};

export interface PostData extends PostItem {
  content: LexicalDocument;
}

export interface Comment {
  _id: string;
  post: string;
  user: {
    _id: string;
    username: string;
  };
  content: string;
  createdAt: string;
  updatedAt: string;
}
