export interface ApiSuccessResponse<T = unknown> {
  ok: true;
  message: string;
  payload?: T;
  meta?: Record<string, unknown>;
}

export interface ApiErrorResponse {
  ok: false;
  message: string;
}
