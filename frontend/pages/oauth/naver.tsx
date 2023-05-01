import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { useEffect } from 'react';

interface LoginResponse {
  access_token : string,
  email : string | null,
  image : string | null,
  introduce : string | null,
  nickname : string
}

const login = async ({ code }: { code: string | undefined}): Promise<LoginResponse> => {
  const BASE_URL = 'http://localhost:8000';
  const response = await fetch(BASE_URL + '/auth/oauth/naver', {
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
  const loggingIn = useMutation<LoginResponse, Error, void>(() => login({ code }), 
  {
    onSuccess: (data) => {
      // console.log('온석세스 :', data);
      localStorage.setItem('access_token', data.access_token)
      // 리코일에 isLoggedIn true, 나머지 data들 저장.
      // 메인페이지로 리다이렉트.
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
    <h1>네이버 로그인 중...</h1>
    </>
  );
}