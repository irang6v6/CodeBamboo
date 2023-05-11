import React from 'react';
import Link from 'next/link';

interface Props {}

export const TopicItem = ({}: Props) => {
  return (
    <div>
      <Link href={`/topics/${7}`}>TopicItem 7</Link>
    </div>
  );
};
