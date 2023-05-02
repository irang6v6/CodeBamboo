import React from 'react';
import { useRouter } from "next/router";

interface Props {
}

export const TopicDetail = ({ } : Props) => {
  const router = useRouter();
  return (
    <div>
      Topic Detail / {router.query.topicId}
    </div>
  );
};

export default TopicDetail
