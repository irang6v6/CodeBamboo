import { UserFollowListItem } from "./UserFollowListItem";

interface Props {
  followingUsers: any;
}

export const UserFollowList = ({ followingUsers }: Props) => {
  if (followingUsers.length === 0) {
    return (
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        팔로우한 유저가 없어요.
      </div>
    );
  }
  return followingUsers.map((user: any, idx: number) => {
    return (
      <div
        className="w-auto h-[10rem] scrollBar-hide
      
      "
        key={idx}
      >
        <UserFollowListItem
          user_id={user.user_id}
          nickname={user.nickname}
          image={user.image}
          followersCnt={user.followersCnt}
          key={idx}
        />
      </div>
    );
  });
};
