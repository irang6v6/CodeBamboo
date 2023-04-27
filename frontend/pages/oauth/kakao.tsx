import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { useEffect } from 'react';

interface LoginResponse {
  // 반환값 지정
}

const login = async ({ code }: { code: string | undefined}): Promise<LoginResponse> => {
  const BASE_URL = 'http://localhost:8000';
  const response = await fetch(BASE_URL + '/users/oauth/kakao', {
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

  const Login = useMutation<LoginResponse, Error, void>('user', () => login({ code }));

  useEffect(() => {
    if (code) {
      Login.mutate();
    }
  }, [code, Login.mutate]);
  
  if (Login.isLoading) {
    return <div>Loading...</div>;
  }

  if (Login.isError) {
    return <div>Error fetching user data</div>;
  }

  console.log(Login.data)
  return (
    <>
    <h1>카카오 로그인 중...</h1>
    </>
  );
}