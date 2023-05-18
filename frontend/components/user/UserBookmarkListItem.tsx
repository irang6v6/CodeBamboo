import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { TopicItemRendering } from '../topic/TopicItemRendering';
import authApi from '@/hooks/api/axios.authorization.instance';
import { CiEdit } from 'react-icons/ci';

interface Props {
  bookmark_id: number;
  topic_id: any;
  creation_time: Date;
  leaf_id: any;
  codes: any;
  memo: string;
  myPage: boolean;
  setBookmarks: Function;
  key: number;
}

export const UserBookmarkListItem = ({
  bookmark_id,
  topic_id,
  leaf_id,
  codes,
  myPage,
  setBookmarks,
  memo,
}: Props) => {
  const router = useRouter();
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [userInput, setUserInput] = useState(memo);

  const onMemoSubmit = async () => {
    await authApi.patch('user/bookmark', {
      bookmarkId: bookmark_id,
      userInput: userInput,
    });
    setBookmarks((prev: any) => {
      return prev.map((bookmark: any) => {
        if (bookmark.bookmark_id === bookmark_id) {
          return { ...bookmark, memo: userInput };
        } else {
          return bookmark;
        }
      });
    });
  };

  return (
    <div
      className={`relative bg-gray-100 shadow-lg flex flex-col items-center justify-between rounded-xl shrink-0 p-[5%]
                    h-[125%]
                    md:w-full md:h-full md:hover:relative md:hover:scale-110 md:transition`}
    >
      <div
        className="relative bg-white w-[95%] h-[84%] rounded-xl overflow-hidden hover:cursor-pointer"
        onClick={() => router.push(`/topics/${topic_id}`)}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-transparent z-40"></div>
        <TopicItemRendering codes={codes} topic_id={topic_id} />
      </div>
      <div
        className="relative bg-white text-xl w-[95%] h-[12%] rounded-xl p-[2%] overflow-hidden
                  md:hover:transition"
        title={userInput}
      >
        {myPage ? (
          <input
            className="text-center h-full w-full cursor-pointer  placeholder-black hover:border-2 hover:border-black rounded-md"
            defaultValue={userInput}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setTimeout(() => setIsInputFocused(false), 300)}
            onChange={(e) => setUserInput(e.target.value)}
            spellCheck="false"
          />
        ) : (
          <p className="text-center h-full w-full rounded-md">{memo}</p>
        )}
        {isInputFocused && (
          <button onClick={onMemoSubmit}>
            <CiEdit
              size={25}
              className="absolute right-3 z-10 cursor-pointer top-[50%] translate-y-[-50%]"
            />
          </button>
        )}
      </div>
    </div>
  );
};
