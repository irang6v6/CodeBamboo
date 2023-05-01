import { Inter } from 'next/font/google'
import { useQuery } from 'react-query'

const inter = Inter({ subsets: ['latin'] })

const fetchUser = async () => {
  const BASE_URL = 'http://localhost:8000'
  const response = await fetch(BASE_URL+'/users/1', {
    method: 'GET',
  })
  const data = await response.json()
  return data
}

export default function Home() {
  const { isLoading, isError, data: seoyong } = useQuery('user', fetchUser)
  const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI
  // 카카오
  const API_KEY_KAKAO = process.env.NEXT_PUBLIC_API_KEY_KAKAO
  const OAUTH_KAKAO = `https://kauth.kakao.com/oauth/authorize?client_id=${API_KEY_KAKAO}&redirect_uri=${REDIRECT_URI+'kakao'}&response_type=code`
  // 네이버
  const client_id = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID
  const state = process.env.NEXT_PUBLIC_NAVER_STATE_TOKEN
  const OAUTH_NAVER = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' + client_id + '&redirect_uri=' + REDIRECT_URI + 'naver' + '&state=' + state
  // 깃허브
  const github_client_id = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID
  const OAUTH_GITHUB = `https://github.com/login/oauth/authorize?client_id=${github_client_id}`
  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error fetching user data</div>
  }

  return (
    <>
    <h1 className="text-3xl underline text-green font-scp font-bold">
      Tailwind CSS rules!
    </h1>
    <div>
      <ol>
        <li>아이디: {seoyong?.id}</li>
        <li>이름: {seoyong?.name}</li>
        <li>나이: {seoyong?.age}</li>
        <li>포지션: {seoyong?.position}</li>
        <li>기술 스택: {seoyong?.skills}</li>
      </ol>
    </div>
    <button><a href={OAUTH_KAKAO}>카카오 로그인</a></button>
    <button><a href={OAUTH_NAVER}>네이버 로그인</a></button>
    <button><a href={OAUTH_GITHUB}>깃허브 로그인</a></button>
    </>
   );
}
