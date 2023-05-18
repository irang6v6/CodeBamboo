import React from 'react';
import { useRecoilValue } from 'recoil';
import { LeafObject, LeafState } from '@/recoil/topic';
import { LeafItem } from './LeafItem';
import { BiArrowFromRight } from 'react-icons/bi'

export interface LeafNode extends LeafObject {
  children?: LeafNode[];
}

interface Props {
  setIsTreeOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LogTree = ({setIsTreeOpen}: Props) => {
  const leafs = useRecoilValue(LeafState);

  const sortedLeafs = leafs
    ? [...leafs].sort((a, b) => {
        if (a.parent_leaf_id === b.parent_leaf_id) {
          if (a.ref_order === b.ref_order) {
            return a.step - b.step;
          }
          return a.ref_order - b.ref_order;
        }
        return a.parent_leaf_id - b.parent_leaf_id;
      })
    : [];

  const buildLogTree = (leafs: LeafObject[], parentLeafId = 0): LeafNode[] => {
    const logTree = [];
    if (leafs) {
      for (const leaf of leafs) {
        if (leaf.parent_leaf_id === parentLeafId) {
          const childleafs = buildLogTree(leafs, leaf.leaf_id);
          const leafNode = { ...leaf, children: childleafs };
          logTree.push(leafNode);
        }
      }
    }
    return logTree;
  };

  const LogTree = buildLogTree(sortedLeafs);

  const renderLogTree = (leafNodes: LeafNode[]) => {
    return leafNodes.map((leaf) => (
      <LeafItem key={leaf.leaf_id} leaf={leaf} isTreeOpen={true}>
        {leaf.children && renderLogTree(leaf.children)}
      </LeafItem>
    ));
  };

  return (
    <div
      className="z-10 bg-slate-400 absolute overflow-y-auto h-full scrollbar-hide
    w-full 
    md:w-[45%]"
    >
      <BiArrowFromRight
        className='z-20 absolute top-3 right-3 w-16 h-16 cursor-pointer'
        onClick={()=>setIsTreeOpen(false)}/>
      {renderLogTree(LogTree)}
    </div>
  );
};
