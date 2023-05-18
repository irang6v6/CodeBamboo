import React from 'react';
import Link from 'next/link';

interface Props {
  user_id: number;
  nickname: string;
  followersCnt: number;
  image: string;
}

export const UserFollowListItem = ({
  user_id,
  nickname,
  image,
  followersCnt,
}: Props) => {
  const userImageItem = (
    <div className="md:relative md:w-[4rem] h-1/2 flex justify-center">
      <img
        className="bg-white rounded-xl max-h-[4rem] md:max-h-[7rem] max-w-[5rem] aspect-square"
        src={`${image}`}
        alt="user profile image"
      />
    </div>
  );

  const userNicknameItem = (
    <div className="text-sm w-full md:text-xl md:h-1/2 rounded-lg text-center">
      {nickname}
    </div>
  );

  const userFollowerItem = (
    <div className="text-sm md:text-base md:h-auto w-full text-center md:text-start">
      팔로워수 : {followersCnt}
    </div>
  );

  return (
    <Link
      href={`/users/${user_id}`}
      className="relative w-auto h-[8rem] md:h-full flex flex-col md:justify-evenly md:items-center rounded-lg shadow-lg bg-gray-100 py-1
                md:hover:scale-105 md:transition md:flex-row"
    >
      {userImageItem}
      <div className="h-2/3 w-full md:w-1/2 flex flex-col items-center justify-center md:justify-evenly">
        {userNicknameItem}
        {userFollowerItem}
      </div>
    </Link>
  );
};
