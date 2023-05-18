import { UserBookmarkListItem } from './UserBookmarkListItem';

interface Props {
  bookmarks: any;
  myPage: boolean;
  setBookmarks: Function;
}

export const UserBookmarkList = ({
  bookmarks,
}: // myPage,
// setBookmarks,
Props) => {
  return bookmarks.map((bookmark: any, idx: number) => {
    return (
      <div className="w-auto h-[90%]" key={idx}>
        <UserBookmarkListItem
          topic_id={bookmark.leaf.topic.topic_id}
          bookmark_id={bookmark.bookmark_id}
          creation_time={bookmark.leaf.creation_time}
          leaf_id={bookmark.leaf.leaf_id}
          codes={bookmark.leaf.codes}
          // memo={bookmark.memo}
          // myPage={myPage}
          // setBookmarks={setBookmarks}
          key={idx}
        />
      </div>
    );
  });
};
