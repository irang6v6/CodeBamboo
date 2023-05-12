import React from 'react';
import { TopicItem } from './TopicItem';
import useIsClient from '@/hooks/useIsClient';
import { TopicItemInF } from './TopicInterface';
import useIsMobile from '@/hooks/useIsMobile';

interface Props {
  topicList: TopicItemInF[];
}

export const TopicList = ({ topicList }: Props) => {
  const isMobile = useIsMobile();
  const isClient = useIsClient();

  const topicListItems = topicList.map((obj: TopicItemInF, idx: number) => {
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
  });

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
      {isClient && topicListItems}
    </div>
  );
};
