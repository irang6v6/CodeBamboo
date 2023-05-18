import { UserBookmarkListItem } from './UserBookmarkListItem';

interface Props {
  bookmarks: any;
}

export const UserBookmarkList = ({ bookmarks }: Props) => {
  return bookmarks.map((bookmark: any, idx: number) => {
    return (
      <div className="md:w-[95%] h-[17.5rem] md:h-[26rem]">
        <UserBookmarkListItem
          topic_id={bookmark.leaf.topic.topic_id}
          creation_time={bookmark.leaf.creation_time}
          leaf_id={bookmark.leaf.leaf_id}
          codes={bookmark.leaf.codes}
          key={idx}
        />
      </div>
    );
  });
};
