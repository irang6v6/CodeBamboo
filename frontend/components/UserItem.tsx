import React from 'react';
import Link from 'next/link';

interface Props {}

export const UserItem = ({}: Props) => {
  return (
    <div>
      <Link href={`/users/${1}`}>UserItem 1</Link>
    </div>
  );
};
