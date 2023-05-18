import axios, { AxiosInstance } from 'axios';
import useAuthInterceptor from './useAuthInterceptor';

// 1. BASEURL 설정
const authApi: AxiosInstance = axios.create({
  baseURL: 'https://k8a801.p.ssafy.io/api/',
  withCredentials: true,
});

// 2. 리퀘스트 헤더에, 엑세스 토큰 설정
authApi.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('access_token');

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

// 3. 에러 확인해서, 엑세스토큰이 유효하지 않거나 만료되었으면, 재발급 요청 보냄.
// 재발급 요청 보냈는데, 리프레시토큰이 유효하지 않거나 만료되었다면, 로그아웃 처리함.
authApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log('originalRequest : ', originalRequest)
    if (error.response && (error.response.data.errorType === 'expired_token' || error.response.data.errorType === 'invalid_payload')) {
      console.log('error response : ', error.response)
      const { handleLogout } = useAuthInterceptor();

      try {
        const newAccessToken = await handleLogout();
        console.log('액세스 토큰 재발급 : ', newAccessToken)
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        console.log('오리지널 리퀘스트 재요청')
        return authApi(originalRequest);
      } catch (error) {
        console.log('오리지널 리퀘스트 재전송 실패 : ', error)
        return Promise.reject(error);
      }
    } else {
      console.log('토큰 만료에러가 아닙니다. 에러 타입은 ? : ', error.response)
    }
    return Promise.reject(error);
  }
);

export default authApi;
