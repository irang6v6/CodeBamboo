import React from 'react';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { articleState, codeState, LeafState, selectedLeafState } from '@/recoil/topic';
import Editor from '@/components/editor/Editor';
import { Log } from '@/components/editor/Log';
import authApi from '@/hooks/api/axios.authorization.instance';

interface Props {}

export const TopicDetail = ({}: Props) => {
  const router = useRouter();
  const topicId = router.query.topicId;
  const setCode = useSetRecoilState(codeState);
  const setArticle = useSetRecoilState(articleState)
  const setSelectedLeaf = useSetRecoilState(selectedLeafState);
  const setLeafs = useSetRecoilState(LeafState);

  const queryFn = async (topicId: any) => {
    if (!topicId) return;
    try {
      const response = await authApi.get(`topic/${topicId}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const getTopic = useQuery(['topic', topicId], () => queryFn(topicId), {
    onSuccess: (data) => {
      setCode(data?.bestLeaf.codes)
      setArticle({title:data?.bestLeaf.title, content:data?.bestLeaf.content})
      setSelectedLeaf({user_id: data?.bestLeaf.user_id, leaf_id: data?.bestLeaf.leaf_id})
      setLeafs(data?.leafs)
    },
  });

  if (getTopic.isLoading) {
    return <h1>로딩 중입니다..</h1>;
  }

  if (getTopic.isError) {
    return;
  }

  return (
    <div className="flex flex-row w-full h-full">
      <Log />
      <Editor />
    </div>
  );
};

export default TopicDetail;
