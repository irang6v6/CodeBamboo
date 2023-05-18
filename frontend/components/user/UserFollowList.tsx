import { UserFollowListItem } from './UserFollowListItem';

interface Props {
  followingUsers: any;
}

export const UserFollowList = ({ followingUsers }: Props) => {
  return followingUsers.map((user: any, idx: number) => {
    return (
      <div className="w-auto h-[10rem] scrollBar-hide
      
      ">
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
