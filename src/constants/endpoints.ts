export const REGISTER = '/auth/register';

export const LOGIN = '/auth/login';

export const LOGOUT = '/auth/logout';

export const FORGOT_PASSWORD = '/auth/forgot-password';

export const RESET_PASSWORD = '/auth/reset-password';

export const USER_PROFILE = '/users/me';

export const CHANGE_PASSWORD = '/users/change-password';

export const POST_BASE = '/posts';

export const SEARCH_POST = '/posts/search';

export const LIST_FAVORITES_POST = '/posts/favorites';

export const POST_ITEM = (postId: string) => `/posts/${postId}`;

export const TOGGLE_FAVORITE_POST = (postId: string) => `/posts/${postId}/toggle-favorite`;

export const COMMENT_BY_POST = (postId: string) => `/comments/${postId}`;

export const COMMENT_ITEM = (commentId: string) => `/comments/${commentId}`;
