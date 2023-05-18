import React, { useState } from 'react';
import { TopicItem } from './TopicItem';
import useIsClient from '@/hooks/useIsClient';
import { TopicItemInF } from './TopicInterface';
import useIsMobile from '@/hooks/useIsMobile';
import Image from 'next/image';
import rightArrowImg from '@/public/images/right_arrow.png';
import leftArrowImg from '@/public/images/left_arrow.png';

interface Props {
  topicList: TopicItemInF[];
}

export const TopicList = ({ topicList }: Props) => {
  const isMobile = useIsMobile();
  const isClient = useIsClient();
  const [viewPart, setViewPart] = useState(0);

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

  function rightArrowClickHandler() {
    setViewPart((prev) => prev + 1);
  }

  function leftArrowClickHandler() {
    setViewPart((prev) => prev - 1);
  }

  const rightArrow =
    viewPart !== 3 ? (
      <Image
        className="absolute right-[2%] top-[50%] -translate-y-[50%] opacity-60 hover:scale-125 hover:opacity-100 transition hover:cursor-pointer z-50"
        src={rightArrowImg}
        alt="오른쪽 화살표"
        onClick={rightArrowClickHandler}
      />
    ) : (
      <></>
    );
  const leftArrow =
    viewPart !== 0 ? (
      <Image
        className="absolute left-0 top-[50%] -translate-y-[50%] opacity-60 hover:scale-125 hover:opacity-100 transition hover:cursor-pointer z-50"
        src={leftArrowImg}
        alt="왼쪽 화살표"
        onClick={leftArrowClickHandler}
      />
    ) : (
      <></>
    );

  return (
    <div
      className={`relative w-screen flex
                  h-[40vh] ${
                    isMobile ? 'overflow-y-visible overflow-x-scroll' : ''
                  }
                  md:w-full md:h-[51vh] md:items-end md:overflow-hidden md:px-5`}
    >
      {!isMobile && rightArrow}
      <div
        className={`w-screen flex
      md:w-full md:h-[53vh] md:items-end md:px-5 md:transition`}
        style={{
          transform: !isMobile ? `translateX(${-40 * viewPart}rem)` : '',
        }}
      >
        {isClient && topicListItems}
      </div>
      {!isMobile && leftArrow}
    </div>
  );
};
