import { UserItem } from './UserItem';

interface Props {
  followingUsers: any;
}

export const FollowList = ({ followingUsers }: Props) => {
  return followingUsers.map((user: any, idx: number) => {
    return (
      <div className="w-auto h-[30%] scrollBar-hide">
        <UserItem
          user_id={user.user_id}
          nickname={user.nickname}
          image={user.image}
          key={idx}
        />
      </div>
    );
  });
};
