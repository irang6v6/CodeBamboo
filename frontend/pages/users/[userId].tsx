import React from 'react';
import { useRouter } from "next/router";

interface Props {
}

export const UserDetail = ({ } : Props) => {
  const router = useRouter();
  return (
    <div>
      User Detail / {router.query.userId}
    </div>
  );
};

export default UserDetail
