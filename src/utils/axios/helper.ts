import instance from './instance';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { ApiSuccessResponse } from '../../types';

export async function getRequest<T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<ApiSuccessResponse<T>>> {
  return instance.get<ApiSuccessResponse<T>>(url, config);
}

export async function postRequest<T, R = ApiSuccessResponse<T>>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<R>> {
  return instance.post<R>(url, data, config);
}

export async function patchRequest<T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<ApiSuccessResponse<T>>> {
  return instance.patch<ApiSuccessResponse<T>>(url, data, config);
}

export async function deleteRequest<T = void>(
  url: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> {
  return instance.delete<T>(url, config);
}
