// 헤더에 엑세스 토큰을 담아서 보내야하는 요청에 대한 훅.

import { useQuery, useMutation } from 'react-query';
import axios from 'axios';

const getHeaders = () => {
  const token = localStorage.getItem('token');
  return { headers: { Authorization: `Bearer ${token}` } };
};

const fetcher = async (url) => {
  const response = await axios.get(url, getHeaders());
  return response.data;
};

const mutator = async ({ url, method, data }) => {
  const response = await axios({
    url,
    method,
    data,
    ...getHeaders(),
  });

  return response.data;
};

export const useAuthenticatedFetch = (key, url) => {
  return useQuery(key, () => fetcher(url));
};

export const useAuthenticatedMutation = (method) => {
  return useMutation((data) => mutator({ ...data, method }), {
    onError: (error) => {
      console.error(error);
    },
  });
};
