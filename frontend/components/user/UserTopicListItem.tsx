import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import HandImage from '@/public/images/hand-panda.png';
import { useRouter } from 'next/router';
import { TopicItemRendering } from '../topic/TopicItemRendering';

interface Props {
  topic_id: any;
  needHelp: boolean;
  creation_time: Date;
  rootLeaf: any;
  bestLeaf: any;
  key: number;
}

export const UserTopicListItem = ({
  topic_id,
  needHelp,
  rootLeaf,
  bestLeaf,
}: Props) => {
  const router = useRouter();
  const needHelpPing = (
    <div
      className="absolute z-50
                  h-[14%] w-[14%] top-[0%] right-[-2%]
                  md:h-12 md:w-12 md:-top-4 md:-right-3"
    >
      <Image
        className="animate-rotation absolute h-full w-full"
        src={HandImage}
        alt="hand"
      />
    </div>
  );

  return (
    <div
      className={`relative h-[125%] bg-gray-100 shadow-lg flex flex-col items-center justify-between rounded-xl p-[5%]
                    md:w-full md:h-full md:hover:relative md:hover:scale-110 md:transition`}
    >
      {needHelp && needHelpPing}
      <div
        className="relative bg-white w-[95%] h-[84%] rounded-xl overflow-hidden hover:cursor-pointer"
        onClick={() => router.push(`/topics/${topic_id}`)}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-transparent z-40"></div>
        <TopicItemRendering codes={rootLeaf.codes} topic_id={topic_id} />
      </div>
      <div
        className="bg-white text-xl w-[95%] h-[12%] rounded-xl p-[2%] overflow-hidden
                        md:hover:text-green-300 md:hover:transition"
        title={rootLeaf.user.title}
      >
        <Link href={`/topics/${topic_id}`}>{rootLeaf.title}</Link>
      </div>
    </div>
  );
};
