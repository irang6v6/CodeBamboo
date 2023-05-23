import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import {
  articleState,
  codeState,
  LeafState,
  selectedLeafState,
} from '@/recoil/topic';
import Loading from '@/components/common/Loading';
import Editor from '@/components/editor/Editor';
import { Log } from '@/components/editor/Log';
import authApi from '@/hooks/api/axios.authorization.instance';

export const queryTopicDetailFn = async (topicId: string) => {
  if (!topicId) return null;
  try {
    const response = await authApi.get(`topic/${topicId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const TopicDetail = () => {
  const router = useRouter();
  const topicId = router.query.topicId as string;
  const setCode = useSetRecoilState(codeState);
  const setArticle = useSetRecoilState(articleState);
  const setSelectedLeaf = useSetRecoilState(selectedLeafState);
  const setLeafs = useSetRecoilState(LeafState);
  const [isLoading, setIsLoading] = useState(true);

  const getTopic = useQuery(
    ['topic', topicId],
    () => queryTopicDetailFn(topicId),
    {
      onSuccess: (data) => {
        setCode(data?.bestLeaf.codes);
        setArticle({
          title: data?.bestLeaf.title,
          content: data?.bestLeaf.content,
        });
        setSelectedLeaf({
          user_id: data?.bestLeaf.user_id,
          leaf_id: data?.bestLeaf.leaf_id,
          nickname: data?.bestLeaf.nickname
        });
        setLeafs(data?.leafs);
        setIsLoading(false);
      },
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) {
    return (
      <div className="flex flex-col w-full h-full justify-center items-center bg-[#69AF9A]">
        <div className="font-scp text-2xl">LOADING...</div>
        <Loading />
      </div>
    );
  }

  if (getTopic.isError) {
    return null;
  }

  return (
    <div className="flex flex-row w-full h-full">
      <Log />
      <Editor />
    </div>
  );
};

export default TopicDetail;
