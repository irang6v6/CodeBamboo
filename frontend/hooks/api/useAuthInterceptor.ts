import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { userState, userDefault } from '@/recoil/user';
import axios from 'axios';

const useAuthInterceptor = () => {
  const router = useRouter();
  const setUser = useSetRecoilState(userState);

  const handleLogout = useCallback(async () => {
    try {
      const newAccessToken = await axios.get('https://k8a801.p.ssafy.io/api/auth/access', { withCredentials: true }).then(res => res.data.data.access_token);
      localStorage.setItem('access_token', newAccessToken);
      return newAccessToken;
    } catch (error) {
      alert('리프레시 토큰이 유효하지 않습니다. 로그아웃 됩니다.');
      setUser(userDefault);
      localStorage.removeItem('access_token')
      router.push('/');
      throw error;
    }
  }, [router, setUser]);

  return { handleLogout };
};

export default useAuthInterceptor;
