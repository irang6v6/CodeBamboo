import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userState } from '@/recoil/user';
import { LoginResponse } from './kakao';

const login = async ({ code }: { code: string | undefined}): Promise<LoginResponse> => {
  const BASE_URL = 'http://localhost:8000';
  const response = await fetch(BASE_URL + '/auth/oauth/github', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code }),
  });
  const data: LoginResponse = await response.json();
  return data;
};

export default function Kakao() {
  const router = useRouter();
  const code = router.query.code as string | undefined;
  const [user, setUser] = useRecoilState(userState)
  const loggingIn = useMutation<LoginResponse, Error, void>(() => login({ code }), 
  {
    onSuccess: (data) => {
      localStorage.setItem('access_token', data.access_token)
      setUser({
        ...data.data,
        isLoggedIn:true
      })
      router.push('/')
    },
    onError: (error) => {
      // console.log('Error:', error);
    },
  });

  useEffect(() => {
    if (code) {
      loggingIn.mutate();
    }
  }, [code, loggingIn.mutate]);
  
  if (loggingIn.isLoading) {
    return <div>Loading...</div>;
  }

  if (loggingIn.isError) {
    return <div>Error fetching user data</div>;
  }

  console.log(loggingIn)
  return (
    <>
    <h1>깃허브 로그인 중...</h1>
    </>
  );
}