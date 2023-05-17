import React from 'react';
import Link from 'next/link';
import { TopicItemInF } from './TopicInterface';
import Image from 'next/image';
import HandImage from '@/public/images/hand-panda.png';
import { useRouter } from 'next/router';
import { TopicItemRendering } from './TopicItemRendering';

interface Props extends TopicItemInF {
  key: number;
}

export const TopicItem = ({
  topic_id,
  needHelp,
  rootLeaf,
  bestLeaf,
}: Props) => {
  const router = useRouter();
  const needHelpPing = (
    <div
      className="absolute z-50
                  h-[12%] w-[10%] top-[63%] right-[61%]
                  md:h-12 md:w-12 md:-top-4 md:-right-3"
    >
      <div className=" absolute h-full w-full rounded-full"></div>
      <Image
        className=" animate-rotation absolute h-full w-full"
        src={HandImage}
        alt="hand"
      />
    </div>
  );

  return (
    <div
      className={`relative bg-gray-100 shadow-lg flex flex-col items-center justify-evenly rounded-xl shrink-0
                    w-[94vw] h-[40vh] mx-[3%]
                    md:w-[30%] md:h-80 md:m-[2%] md:hover:relative md:hover:scale-110 md:transition`}
    >
      {needHelp && needHelpPing}
      <div
        className="relative bg-white w-[90%] h-[60%] rounded-xl overflow-hidden hover:cursor-pointer"
        onClick={() => router.push(`/topics/${topic_id}`)}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-transparent z-40"></div>
        <TopicItemRendering codes={rootLeaf.codes} topic_id={topic_id} />
      </div>
      <div className="w-[90%] h-[25%] flex justify-evenly">
        <img
          className="bg-white rounded-xl hover:shadow-lg hover:transition hover:cursor-pointer aspect-square md:w-[6rem]"
          src={`${rootLeaf.image}`}
          alt="user Image"
          onClick={() => {
            router.push(`/users/${rootLeaf.user_id}`);
          }}
        />
        <div className="pl-[5%] w-[65%] flex flex-col justify-between">
          <div
            className="bg-white text-xl h-[50%] rounded-xl p-[2%] px-[4%] overflow-hidden pt-[7px]
                        md:hover:text-bamboo md:hover:transition"
            title={`${rootLeaf.title}`}
          >
            <Link href={`/topics/${topic_id}`}>{rootLeaf.title}</Link>
          </div>
          <div className="bg-white text-base h-auto rounded-lg p-[1%] px-[3%]">
            <Link href={`/users/${rootLeaf.user_id}`}>{rootLeaf.nickname}</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
