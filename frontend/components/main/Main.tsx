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
      <p
        className="font-scp m-5
                  text-3xl
                  md:mx-20 md:mt-7 md:text-5xl"
      >
        Popular
      </p>
      <TopicList topicList={mainTopicList.popular} />
      <p
        className="font-scp m-5
                  text-3xl
                  md:mx-20 md:mt-7 md:text-5xl"
      >
        Trending
      </p>
      <TopicList topicList={mainTopicList.trending} />
    </div>
  );
}
