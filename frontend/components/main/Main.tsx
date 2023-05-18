import useIsMobile from '@/hooks/useIsMobile';
import useIsClient from '@/hooks/useIsClient';
import { TopicList } from '../topic/TopicList';
import { useEffect } from 'react';
import { getMainList } from '@/hooks/api/topic.api';
import { useRecoilState } from 'recoil';
import { mainTopicListState } from '@/recoil/topic';

export default function Main() {
  const isClient = useIsClient();
  const isMobile = useIsMobile();
  const [mainTopicList, setMainTopicList] = useRecoilState(mainTopicListState);

  useEffect(() => {
    if (isClient) {
      getMainList(setMainTopicList);
    }
  }, [isClient]);

  return (
    <div className="relative w-full top-[700vh] h-[100vh] overflow-y-scroll z-30 scrollbar-hide">
      {/* 스크롤바에 밀리지않게 더미 박스 매우 중요*/}
      {isClient && isMobile && <div className="w-full h-20"></div>}
      <div
        className="m-5 mb-0 pl-5 pb-5 border-b-gray-600 border-b-2
                  text-3xl
                  md:mx-20 md:mt-7 md:text-4xl"
      >
        Popular
      </div>
      <TopicList topicList={mainTopicList.popular} />
      <div
        className="m-5 mb-0 pl-5 pb-5 border-b-gray-600 border-b-2
                  text-3xl
                  md:mx-20 md:mt-14 md:text-4xl"
      >
        Trending
      </div>
      <TopicList topicList={mainTopicList.trending} />
    </div>
  );
}
