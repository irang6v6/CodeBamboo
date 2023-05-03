import { useQuery } from 'react-query'
import { LeafItem } from '@/components/LeafItem'
import { UserItem } from '@/components/UserItem'
import { useRecoilState } from 'recoil'
import { userState } from '@/recoil/user'

const fetchUser = async () => {
  const BASE_URL = 'http://localhost:8000'
  const response = await fetch(BASE_URL+'/users/1', {
    method: 'GET',
  })
  const data = await response.json()
  return data
}

export default function Home() {
  const [user, setUser] = useRecoilState(userState)
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


  return (
    <>
      <h1 className="text-3xl underline text-bamboo font-scp font-bold">
        Tailwind CSS rules!
      </h1>
      <div>
        <ol>
          <img src={user?.image} alt="" className='h-24'/>
          <li>닉네임: {user?.nickname}</li>
          <li>이메일: {user?.email}</li>
          <li>자기소개: {user?.introduce}</li>
          {user.isLoggedIn?
          <li>소셜로그인: {user?.provider}</li>
          :
          <li>로그인 상태 : false</li>
          }
        </ol>
      </div>
      <button><a href={OAUTH_KAKAO}>카카오 로그인</a></button>
      <button><a href={OAUTH_NAVER}>네이버 로그인</a></button>
      <button><a href={OAUTH_GITHUB}>깃허브 로그인</a></button>
      <LeafItem />
      <UserItem />
    </>
  );
}
