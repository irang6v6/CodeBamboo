import axios, { AxiosRequestConfig, Method } from 'axios';

export const getHeaders = () => {
  const token = localStorage.getItem('token');
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const request = async (url: string, method: Method, data?: Object) => {
  const config: AxiosRequestConfig = {
    url,
    method,
    ...getHeaders(),
  };

  if (data) {
    config.data = data;
  }

  const response = await axios(config);
  return response.data;
};
