import { request } from './api.request.config';
import { useQuery, useMutation, UseQueryOptions, UseMutationOptions, QueryFunction } from 'react-query';

export const useQueryApi = (
  key: string,
  url: string,
  config?: UseQueryOptions<any, unknown, any, string>
) => {
  return useQuery(
    key,
    () => request(url, 'GET'),
    {
      ...config,
      onSuccess: config?.onSuccess,
      onError: config?.onError,
    }
  );
};

export const useMutationApi = (
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  config?: UseMutationOptions<any, unknown, { url: string; payload: Object }, unknown>
) => {
  return useMutation(
    (data: { url: string; payload: Object }) => request(data.url, method, data.payload),
    {
      ...config,
      onSuccess: config?.onSuccess,
      onError: config?.onError,
    }
  );
};
