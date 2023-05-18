import { UserBookmarkListItem } from './UserBookmarkListItem';

interface Props {
  bookmarks: any;
  myPage: boolean;
  setBookmarks: Function;
}

export const UserBookmarkList = ({
  bookmarks,
  myPage,
  setBookmarks,
}: Props) => {
  if (bookmarks.length === 0) {
    return (
      <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
        북마크한 리프가 없어요.
      </div>
    );
  }
  return bookmarks.map((bookmark: any, idx: number) => {
    return (
      <div className="md:w-[45%] md:mr-[2%] h-full md:h-[95%]" key={idx}>
        <UserBookmarkListItem
          topic_id={bookmark.leaf.topic.topic_id}
          bookmark_id={bookmark.bookmark_id}
          creation_time={bookmark.leaf.creation_time}
          leaf_id={bookmark.leaf.leaf_id}
          codes={bookmark.leaf.codes}
          memo={bookmark.memo}
          myPage={myPage}
          setBookmarks={setBookmarks}
          key={idx}
        />
      </div>
    );
  });
};
