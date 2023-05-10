import { useMutation, useQuery } from 'react-query';
import { TopicItem } from '@/components/TopicItem';
import { UserItem } from '@/components/UserItem';
import { useRecoilState } from 'recoil';
import { userDefault, userState } from '@/recoil/user';
import Authapi from '@/hooks/api/axios.authorization.instance';
import { useRouter } from 'next/router';
import axios from 'axios';
import { isIntroState } from '@/recoil/isIntro';

// <<query 전략을 정의한다.>>

// 1. useQuery
// 1-1. 쿼리 키를 정의한다. 여기에도 일정한 컨벤션을 갖는 편이 좋다.
// 컨벤션) [api명세의 대분류_리소스 경로, 동적인 인자(쿼리스트링 or {path})]

// 2. useMutaion
const queryFn = async () => {
  // 로그아웃 하시겠습니까? 로직 추가..
  try {
    const response = await Authapi.post('auth/logout');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default function Main() {
  const [user, setUser] = useRecoilState(userState);
  const [isIntro, setIsIntro] = useRecoilState(isIntroState);
  const router = useRouter();
  const logoutMutation = useMutation(queryFn, {
    onSuccess: (data) => {
      console.log(data);
      localStorage.removeItem('access_token');
      localStorage.removeItem('provider');
      setUser(userDefault);
      router.push('/');
    },
  });

  const test123 = async () => {
    try {
      const newAccessToken = await axios
        .get('http://localhost:8000/auth/access', { withCredentials: true })
        .then((res) => res.data.data.access_token);
      localStorage.setItem('access_token', newAccessToken);
      router.push('/');
      console.log(newAccessToken);
    } catch (error) {}
  };
  return (
    <div className="absolute top-[700vh] z-30">
      <h1 className="text-3xl underline text-bamboo font-scp font-bold">
        Tailwind CSS rules!
      </h1>
      <div>
        <ol>
          <img src={user?.image} alt="" className="h-24" />
          <li>닉네임: {user?.nickname}</li>
          <li>이메일: {user?.email}</li>
          <li>자기소개: {user?.introduce}</li>
          {user.isLoggedIn ? (
            <li>소셜로그인: {user?.provider}</li>
          ) : (
            <li>로그인 상태 : false</li>
          )}
        </ol>
      </div>
      {user.isLoggedIn && (
        <>
          <button
            className="pink-button"
            onClick={() => logoutMutation.mutate()}
          >
            로그아웃
          </button>
          <button className="pink-button" onClick={() => test123()}>
            리프레시
          </button>
        </>
      )}
      <TopicItem />
      <UserItem />
    </div>
  );
}
