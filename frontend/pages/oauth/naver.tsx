import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useLogin } from '@/hooks/auth/useLogin';

export default function Naver() {
  const router = useRouter()
  const code = router.query.code as string | undefined;
  
  const loginMutation = useLogin(code, 'naver')

  useEffect(() => {
    if (code) {
      loginMutation.mutate();
    }
  }, [code, loginMutation.mutate]);
  
  if (loginMutation.isLoading) {
    return <div>곧 인증작업이 시작됩니다...</div>;
  }

  if (loginMutation.isError) {
    return <div>Error fetching user data</div>;
  }

  return (
    <>
    <h1>네이버 인증 처리 중입니다...</h1>
    </>
  );
}