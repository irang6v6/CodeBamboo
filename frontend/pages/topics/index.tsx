import React from 'react';
import { Editor } from '@/components/editor/Editor';

interface Props {
}

export const Topics = ({ } : Props) => {
  return (
    <div>
      New Topic
      <Editor />
    </div>
  );
};

export default Topics