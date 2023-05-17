import React, { useState } from 'react';
import { useMutation } from 'react-query';
import router from 'next/router';
import {
  LeafObject,
  codeState,
  articleState,
  selectedLeafState,
  LeafState,
} from '@/recoil/topic';
import { useRecoilState, useSetRecoilState } from 'recoil';
import authApi from '@/hooks/api/axios.authorization.instance';
import { HiCode } from 'react-icons/hi';
import {
  RiThumbUpLine,
  RiThumbUpFill,
  RiBookmarkLine,
  RiBookmarkFill,
} from 'react-icons/ri';
import useIsMobile from '@/hooks/useIsMobile';

interface LeafItemProps {
  leaf: LeafObject;
}

const queryLikeFn = async (leafId: number) => {
  try {
    const response = await authApi.post(`user/like/${leafId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const queryBookmarkFn = async (leafId: number) => {
  try {
    const response = await authApi.post(`user/bookmark/${leafId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const LeafItem = ({ leaf }: LeafItemProps) => {
  const [selectedLeaf, setSelectedLeaf] = useRecoilState(selectedLeafState);
  const setCode = useSetRecoilState(codeState);
  const setArticle = useSetRecoilState(articleState);
  const setLeafs = useSetRecoilState(LeafState);
  const [isLiked, setIsLiked] = useState(leaf.isLiked);
  const [isBookmarked, setIsBookmarked] = useState(leaf.isBookmarked);
  const isMobile = useIsMobile();

  const selectLeaf = () => {
    setSelectedLeaf({
      user_id: leaf.user_id,
      leaf_id: leaf.leaf_id,
    });
    setCode(leaf.codes);
    setArticle({
      title: leaf.title,
      content: leaf.content,
    });
  };

  const mutateLike = useMutation(() => queryLikeFn(leaf.leaf_id), {
    onSuccess: (data) => {
      console.log(data)
      setLeafs((leafs)=>leafs.map((l) => {
        if (l.leaf_id === leaf.leaf_id) {
          return { ...l, isLiked:!l.isLiked };
        }
        return l
      }))
    },
    onMutate: () => {
      setIsLiked((prev)=>!prev);
    },
  });

  const mutateBookmark = useMutation(() => queryBookmarkFn(leaf.leaf_id), {
    onSuccess: (data) => {
      console.log(data)
      setLeafs((leafs)=>leafs.map((l) => {
        if (l.leaf_id === leaf.leaf_id) {
          return { ...l, isBookmarked:!l.isBookmarked };
        }
        return l
      }))
    },
    onMutate: () => {
      setIsBookmarked((prev)=>!prev);
    },
  });

  const CodeIcon = () => {
    return <>{leaf.type === 1 && <HiCode className="text-[1.5rem]" />}</>;
  };

  const LeafTitle = () => {
    return (
      <span className="text-[0.8rem]">
        {leaf.title.length < (isMobile ? 11 : 21) ? leaf.title : leaf.title.slice(0, (isMobile ? 10 : 20)) + '...'}
      </span>
    );
  };

  const LikeIcon = () => {
    return (
      <div
        className="z-10"
        onClick={(e) => {
          e.stopPropagation();
          mutateLike.mutate();
        }}
      >
        {isLiked ? (
          <RiThumbUpFill className="text-[1.5rem]" />
        ) : (
          <RiThumbUpLine className="text-[1.5rem]" />
        )}
      </div>
    );
  };

  const BookmarkIcon = () => {
    return (
      <div
        className="z-10"
        onClick={(e) => {
          e.stopPropagation();
          mutateBookmark.mutate();
        }}
      >
        {isBookmarked ? (
          <RiBookmarkFill className="text-[1.5rem]" />
        ) : (
          <RiBookmarkLine className="text-[1.5rem]" />
        )}
      </div>
    );
  };

  return (
    <div
      className={`bg-slate-300 shrink-0 h-12 m-2 p-2 rounded-md flex items-center justify-between cursor-pointer drop-shadow-lg shadow-md 
                ${selectedLeaf.leaf_id === leaf.leaf_id ? 'border-bamboo border-2 bg-slate-50' : ''}`}
      onClick={selectLeaf}
    >
      <CodeIcon />
      <LeafTitle />
      <div className='flex flex-row gap-1'>
        <LikeIcon />
        <BookmarkIcon />
      </div>
    </div>
  );
};
