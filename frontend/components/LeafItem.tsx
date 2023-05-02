import React from 'react';
import Link from 'next/link';

interface Props {}

export const LeafItem = ({}: Props) => {
  return (
    <div>
      <Link href={`/topics/${1}`}>LeafItem 1</Link>
    </div>
  );
};
