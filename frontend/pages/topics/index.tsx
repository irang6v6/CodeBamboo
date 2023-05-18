import React, { useEffect } from 'react';
import { Editor } from '@/components/editor/Editor';
import { useResetRecoilState } from 'recoil';
import { LeafState, articleState, codeState, selectedLeafState } from '@/recoil/topic';

export const Topics = () => {
  const resetCode = useResetRecoilState(codeState);
  const resetArticle = useResetRecoilState(articleState);
  const resetSelectedLeaf = useResetRecoilState(selectedLeafState);
  const resetLeafs = useResetRecoilState(LeafState);
  
  useEffect(() => {
    resetCode()
    resetArticle()
    resetLeafs()
    resetSelectedLeaf()
  },[])

  return (
    <>
      <Editor />
    </>
  );
};

export default Topics;
