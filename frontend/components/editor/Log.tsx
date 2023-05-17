import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { LeafState } from '@/recoil/topic';
import { LeafItem } from './LeafItem';
import { GrTree } from 'react-icons/gr';
import useIsMobile from '@/hooks/useIsMobile';

export const Log = () => {
  const [leafs, setLeafs] = useRecoilState(LeafState);
  const [isLogOpen, setIsLogOpen] = useState(false);
  const isMobile = useIsMobile();
  const [isTimeline, setIsTimeline] = useState(true);

  useEffect(() => {
    if (leafs) {
      if (isTimeline) {
        setLeafs((prevLeafs) =>
          [...prevLeafs].sort((a, b) => a.leaf_id - b.leaf_id)
        );
      } else {
        setLeafs((prevLeafs) =>
          [...prevLeafs].sort((a, b) => b.likeCnt - a.likeCnt)
        );
      }
    }
  }, [isTimeline]);

  const LeafItems = () => {
    return (
      <div
        className="bg-slate-400 flex flex-col z-20 h-full overflow-y-auto
                  absolute left-0 w-3/5 
                  md:static md:w-full md:max-w-xs"
      >
        <div className="flex flex-row self-end mr-3 mt-4 cursor-pointer gap-5">
          <span
            className={`border-b-4 ${
              isTimeline ? 'font-semibold border-lime-300' : 'border-none'
            }`}
            onClick={() => setIsTimeline(true)}
          >
            시간순
          </span>
          <span
            className={`border-b-4 ${
              !isTimeline ? 'font-semibold border-lime-300' : 'border-none'
            }`}
            onClick={() => setIsTimeline(false)}
          >
            좋아요순
          </span>
        </div>
        {leafs?.map((e) => (
          <LeafItem key={e.leaf_id} leaf={e} />
        ))}
      </div>
    );
  };

  const LogOpenBackground = (
    <div
      className="bg-transparent fixed top-0 left-0 w-full h-full z-10
                md:hidden"
      onClick={() => setIsLogOpen(false)}
    >
      ?
    </div>
  );

  return (
    <>
      {isMobile ? (
        !isLogOpen ? (
          <div
            className="flex justify-center items-center bg-white rounded-full h-20 w-20 fixed left-8 bottom-10 border-4 border-bamboo"
            onClick={() => setIsLogOpen(true)}
          >
            <GrTree className="text-[3rem] text-white" />
          </div>
        ) : (
          <div>
            <LeafItems />
            {LogOpenBackground}
          </div>
        )
      ) : (
        <LeafItems />
      )}
    </>
  );
};
