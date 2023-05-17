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
    <div className="md:relative md:w-[4rem] h-[4rem]">
      <img
        className="bg-white rounded-xl"
        src={`${image}`}
        alt="user profile image"
      />
    </div>
  );

  const userNicknameItem = (
    <div className="text-xl h-1/2 rounded-lg p-[1%] pt-[10%]">{nickname}</div>
  );

  const userFollowerItem = (
    <div className="h-auto p-[1%] pb-[10%]">팔로워수 : {followersCnt}</div>
  );

  return (
    <Link
      href={`/users/${user_id}`}
      className="relative w-full h-full flex justify-evenly items-center rounded-lg shadow-lg bg-gray-100
                md:hover:scale-105 md:transition"
    >
      {userImageItem}
      <div className="h-full w-1/2 flex flex-col justify-center">
        {userNicknameItem}
        {userFollowerItem}
      </div>
    </Link>
  );
};
