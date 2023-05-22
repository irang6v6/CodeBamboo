import React, { useState } from 'react';
import { useMutation } from 'react-query';
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
import { BsArrowReturnRight } from 'react-icons/bs'
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

interface LeafItemProps {
  leaf: LeafObject;
  isTreeOpen: boolean;
}

export const LeafItem = ({
  leaf,
  isTreeOpen,
  children,
}: React.PropsWithChildren<LeafItemProps>) => {
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
      nickname: leaf.nickname
    });
    setCode(leaf.codes);
    setArticle({
      title: leaf.title,
      content: leaf.content,
    });
  };

  const mutateLike = useMutation(() => queryLikeFn(leaf.leaf_id), {
    onSuccess: (data) => {
      console.log(data);
    },
    onMutate: () => {
      setIsLiked((prev) => !prev);
      setLeafs((leafs) =>
        leafs.map((l) => {
          if (l.leaf_id === leaf.leaf_id) {
            return {
              ...l,
              isLiked: !l.isLiked,
              likeCnt: l.likeCnt + (!l.isLiked ? 1 : -1),
            };
          }
          return l;
        })
      );
    },
  });

  const mutateBookmark = useMutation(() => queryBookmarkFn(leaf.leaf_id), {
    onSuccess: (data) => {
      console.log(data);
      setLeafs((leafs) =>
        leafs.map((l) => {
          if (l.leaf_id === leaf.leaf_id) {
            return { ...l, isBookmarked: !l.isBookmarked };
          }
          return l;
        })
      );
    },
    onMutate: () => {
      setIsBookmarked((prev) => !prev);
    },
  });

  const CodeIcon = () => {
    const codeexist =
      leaf.type === 1 &&
      leaf.codes.some((code) => (code.content?.length ?? 0) > 0);
    return <>{codeexist ? <HiCode className="text-[1.5rem]" /> : null}</>;
  };

  const LeafTitle = () => {
    return (
      <span className="mx-auto text-[0.8rem]">
        {leaf.title.length < (isMobile ? 11 : isTreeOpen ? 16 : 21)
          ? leaf.title
          : leaf.title.slice(0, isMobile ? 10 : isTreeOpen ? 15 : 20) + '...'}
      </span>
    );
  };

  const LikeIcon = () => {
    return (
      <div
        className="flex flex-row gap-2 w-10 z-10"
        onClick={(e) => {
          e.stopPropagation();
          mutateLike.mutate();
        }}
      >
        {leaf.likeCnt}
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
    <>
      <div className="flex flex-row w-full px-2">
        {!leaf.is_root && children && <BsArrowReturnRight className='mt-5 mr-2 shrink-0'/>}
        <div
          className={`bg-slate-300 shrink-0 h-12 p-2 my-2 rounded-md flex items-center cursor-pointer drop-shadow-lg shadow-md 
                  ${
                    selectedLeaf.leaf_id === leaf.leaf_id
                      ? 'border-bamboo border-2 bg-slate-50'
                      : ''
                  }
                  ${isTreeOpen ? 'w-[17.5rem]' : 'w-full'}
                  `}
          onClick={selectLeaf}
        >
          <CodeIcon />
          <LeafTitle />
          {!leaf.is_deleted && (
            <div className="flex flex-row gap-1 ml-auto">
              <LikeIcon />
              <BookmarkIcon />
            </div>
          )}
        </div>
      </div>
      <div className="ml-10">{children}</div>
    </>
  );
};
