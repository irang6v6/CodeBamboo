import React from 'react';
import { useRouter } from 'next/router';
import { TopicItemRendering } from '../topic/TopicItemRendering';

interface Props {
  topic_id: any;
  creation_time: Date;
  leaf_id: any;
  codes: any;
  key: number;
}

export const UserBookmarkListItem = ({ topic_id, leaf_id, codes }: Props) => {
  const router = useRouter();
  return (
    <div
      className={`relative bg-gray-100 shadow-lg flex flex-col items-center justify-between rounded-xl shrink-0 p-[5%]
                    w-[94vw] h-[40vh] mx-[3%]
                    md:w-full md:h-full md:hover:relative md:hover:scale-110 md:transition`}
    >
      <div
        className="relative bg-white w-full h-full rounded-xl overflow-hidden hover:cursor-pointer"
        onClick={() => router.push(`/topics/${topic_id}`)}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-transparent z-40"></div>
        <TopicItemRendering codes={codes} topic_id={topic_id} />
      </div>
    </div>
  );
};
