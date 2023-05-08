import { useMutation } from 'react-query';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { userState } from '@/recoil/user';
import { useRouter } from 'next/router';

interface LoginResponse {
  messeage:string,
  access_token : string,
  data: {
    email : string,
    image : string,
    introduce : string | null,
    nickname : string,
    provider : string,
    user_id : number
  }
}

const serveAuthCode = async (code:string|undefined, provider:string): Promise<LoginResponse> => {
  if (!code) throw new Error('Auth code is not defined');

  const BASE_URL = 'http://localhost:8000/auth/oauth/';
  const response = await axios.post(BASE_URL + provider, {code}, {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials:true
  });
  return response.data;
};

export const useLogin = (code:string|undefined, provider:string) => {
  const [user, setUser] = useRecoilState(userState)
  const router = useRouter()
  
  return useMutation(() => serveAuthCode(code, provider), {
    onSuccess: (data) => {
      console.log('로그인 성공. 유저 정보 :', data);
      localStorage.setItem('access_token', data.access_token)
      localStorage.setItem('provider', data.data.provider)
      setUser({
        ...data.data,
        isLoggedIn:true
      })
      router.push('/')
    },
    onError: (error) => {
      console.error(error);
    },
  });
};