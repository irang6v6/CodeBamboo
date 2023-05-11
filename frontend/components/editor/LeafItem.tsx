import React from 'react';
import { LeafObject, codeState, articleState, selectedLeafState } from '@/recoil/topic';
import { useRecoilState, useSetRecoilState } from 'recoil';

interface LeafItemProps {
  leaf: LeafObject;
}

export const LeafItem = ({ leaf }: LeafItemProps) => {
  const [selectedLeaf, setSelectedLeaf] = useRecoilState(selectedLeafState);
  const setCode = useSetRecoilState(codeState);
  const setArticle = useSetRecoilState(articleState);

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

  return (
    <div
      className={`shrink-0 h-auto m-2 rounded-md flex items-center justify-center cursor-pointer shadow-sm 
                ${selectedLeaf.leaf_id === leaf.leaf_id ? 'bg-bamboo' : ''}`}
      onClick={selectLeaf}
    >
      {leaf.title}
    </div>
  );
};
