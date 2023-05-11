import { UserItem } from '@/components/UserItem';
import useIsMobile from '@/hooks/useIsMobile';
import useIsClient from '@/hooks/useIsClient';
import { TopicList } from '../topic/TopicList';

// <<query 전략을 정의한다.>>

// 1. useQuery
// 1-1. 쿼리 키를 정의한다. 여기에도 일정한 컨벤션을 갖는 편이 좋다.
// 컨벤션) [api명세의 대분류_리소스 경로, 동적인 인자(쿼리스트링 or {path})]

// 2. useMutaion
// const queryFn = async () => {
//   // 로그아웃 하시겠습니까? 로직 추가..
//   try {
//     const response = await Authapi.post('auth/logout');
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// };

export default function Main() {
  const isClient = useIsClient();
  const isMobile = useIsMobile();
  return (
    <div className="relative w-full top-[700vh] h-[100vh] overflow-y-scroll z-30 scrollbar-hide">
      {/* 스크롤바에 밀리지않게 더미 박스 매우 중요*/}
      {isClient && isMobile && <div className="w-full h-20"></div>}
      <p
        className="m-5
                  text-3xl
                  md:mx-20 md:mt-7 md:text-5xl"
      >
        Popular
      </p>
      <TopicList type={0} />
      <p
        className="m-5
                  text-3xl
                  md:mx-20 md:mt-7 md:text-5xl"
      >
        Trending
      </p>
      <TopicList type={1} />
      <p
        className="m-5
                  text-3xl
                  md:mx-20 md:mt-7 md:text-5xl"
      >
        Interesting people
        {isMobile && <br />}
        to follow
      </p>
      <UserItem />
    </div>
  );
}
