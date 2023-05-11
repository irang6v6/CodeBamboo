import React, { ReactNode, useEffect, useState } from 'react';
import { TopicItem } from './TopicItem';
import useIsClient from '@/hooks/useIsClient';
import authApi from '@/hooks/api/axios.authorization.instance';
import { TopicItemInF } from './TopicInterface';
import useIsMobile from '@/hooks/useIsMobile';

interface Props {
  type: number;
}

export const TopicList = ({ type }: Props) => {
  const isMobile = useIsMobile();
  const isClient = useIsClient();
  const [trendingTopicItems, setTrendingTopicItems] = useState(
    (): ReactNode => <></>
  );
  async function getList() {
    const topicItemsData: TopicItemInF[] = await authApi
      .get('/topic/mainList')
      .then((res) => {
        if (type === 0) {
          return res.data.popular;
        } else {
          return res.data.trending;
        }
      });
    setTrendingTopicItems(
      topicItemsData.slice(0, 3).map((obj: TopicItemInF, idx: number) => {
        return (
          <TopicItem
            topic_id={obj.topic_id}
            needHelp={obj.needHelp}
            creation_time={obj.creation_time}
            rootLeaf={obj.rootLeaf}
            bestLeaf={obj.bestLeaf}
            key={idx}
          />
        );
      })
    );
  }
  useEffect(() => {
    if (isClient) {
      getList();
    }
  }, [isClient]);
  return (
    <div
      className={`w-screen flex 
                  h-[40vh] ${
                    isMobile
                      ? 'overflow-y-visible overflow-x-scroll scrollbar-hide'
                      : ''
                  }
                  md:w-full md:h-[50vh] md:justify-center`}
    >
      {trendingTopicItems}
    </div>
  );
};
