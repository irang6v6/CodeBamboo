import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { TopicItemRendering } from '../topic/TopicItemRendering';
import { CiEdit } from 'react-icons/ci';
import { useForm } from 'react-hook-form';
import authApi from '@/hooks/api/axios.authorization.instance';

interface Props {
  bookmark_id: number;
  topic_id: any;
  creation_time: Date;
  leaf_id: any;
  codes: any;
  // memo: string;
  // myPage: boolean;
  // setBookmarks: Function;
  key: number;
}

export const UserBookmarkListItem = ({
  bookmark_id,
  topic_id,
  leaf_id,
  codes,
}: // myPage,
// setBookmarks,
// memo,
Props) => {
  const router = useRouter();
  // const [isInputFocused, setIsInputFocused] = useState(false);

  // const {
  //   register: registerMemo,
  //   handleSubmit: handleMemoSubmit,
  //   formState: { errors: memoErrors },
  //   setValue,
  //   reset,
  //   watch,
  //   setFocus,
  // } = useForm();

  // const onMemoSubmit = async () => {
  //   if (memo === watch('memo')) {
  //     setFocus('memo');
  //   } else {
  //     console.log(watch('memo'));
  //     if (window.confirm('메모를 수정하시겠습니까?')) {
  //       try {
  //         await authApi
  //           .patch('user/bookmark', { userInput: watch('memo') })
  //           .then((res) => res.data);
  //         setBookmarks((perv: any) => {
  //           return perv.map((bookmark: any) => {
  //             if (bookmark.bookmark_id === bookmark_id) {
  //               return { ...bookmark, memo };
  //             } else {
  //               return bookmark;
  //             }
  //           });
  //         });
  //         alert('메모 수정 완료 !');
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //   }
  // };

  return (
    <div
      className={`relative bg-gray-100 shadow-lg flex flex-col items-center justify-between rounded-xl shrink-0 py-[5%]
                    w-[94vw] h-[40vh] mx-[3%]
                    md:w-full md:h-full md:hover:relative md:hover:scale-110 md:transition`}
    >
      <div
        className="relative bg-white w-[90%] h-[84%] rounded-xl overflow-hidden hover:cursor-pointer"
        onClick={() => router.push(`/topics/${topic_id}`)}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-transparent z-40"></div>
        <TopicItemRendering codes={codes} topic_id={topic_id} />
      </div>
      {/* <div
        className="bg-white text-xl w-[90%] h-[12%] rounded-xl p-[2%] px-[4%] overflow-hidden
                        md:hover:text-green-300 md:hover:transition"
        title={memo}
      >
        {
          <form onSubmit={handleMemoSubmit(onMemoSubmit)}>
            <input
              id="memo"
              {...registerMemo('memo', {
                required: true,
                pattern: /^[\uAC00-\uD7AFa-zA-Z0-9_\-]{2,15}$/,
              })}
              className="text-center h-full w-full cursor-pointer  placeholder-black hover:border-2 hover:border-black rounded-md"
              defaultValue={memo}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setTimeout(() => setIsInputFocused(false), 300)}
            />
            {isInputFocused && (
              <button type="submit">
                <CiEdit
                  size={20}
                  className="absolute right-4 z-10 cursor-pointer top-[0.2rem]"
                />
              </button>
            )}
            {memoErrors.nickname && (
              <p className="absolute top-full left-0 text-center text-xs text-red-400 pointer-events-none z-10">
                유효하지 않은 입력입니다.
              </p>
            )}
          </form>
        }
      </div> */}
    </div>
  );
};
