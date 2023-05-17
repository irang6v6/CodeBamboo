import React, { useEffect, useState } from 'react';
import { userDefault, userState } from '@/recoil/user';
import useIsMobile from '@/hooks/useIsMobile';
import authApi from '@/hooks/api/axios.authorization.instance';
import { useQuery } from 'react-query';
import { useForm } from 'react-hook-form';
import { CiEdit } from 'react-icons/ci';
import { useRecoilState } from 'recoil';
import { UserTopicsList } from './UserTopicList';
import { UserBookmarkList } from './UserBookmarkList';
import { UserFollowList } from './UserFollowList';

interface Props {
  userId: string;
  myPage: boolean;
}

const cntDiv = (isMobile: boolean, user: any) => {
  return (
    <>
      {isMobile ? (
        <h1>아이콘</h1>
      ) : (
        <div className="grid grid-cols-2 gap-2 mx-0 my-2 border-2 border-black-300 h-[25%] bg-transparent rounded">
          <article className="article justify-center min-w-[10rem] items-start ps-2 bg-transparent">
            Follwers // {user.followersCnt}
          </article>
          <article className="article justify-center min-w-[10rem] items-start ps-2 bg-transparent">
            Topics // {user.topicsCnt}
          </article>
          <article className="article justify-center min-w-[10rem] items-start ps-2 bg-transparent">
            Leafs // {user.leafsCnt}
          </article>
          <article className="article justify-center min-w-[10rem] items-start ps-2 bg-transparent">
            Bookmarks // {user.bookmarksCnt}
          </article>
        </div>
      )}
    </>
  );
};

const queryFn = async (userId: string) => {
  try {
    const response = await authApi.get('user/' + userId);
    // setUser, res.data
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const ProfilePage = ({ userId, myPage }: Props) => {
  const isMobile = useIsMobile();
  const [menu, setMenu] = useState('topics');
  const [isInputFocused, setInputFocus] = useState(false);
  const [isTextAreaFocused, setTextAreaFocus] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const [myState, setMyState] = useRecoilState(userState);

  const {
    register: registerNickname,
    handleSubmit: handleNicknameSubmit,
    formState: { errors: nicknameErrors },
    setValue,
    reset,
    watch,
    setFocus,
  } = useForm();

  const registerIntro = useForm();

  // 유저 정보 API
  const [user, setUser] = useState(userDefault);
  const getUser = useQuery(['users', userId], () => queryFn(userId), {
    // 원하는 시점에 쿼리를 호출할 수 있게 하는 옵션
    enabled: !!userId,
    onSuccess: (data) => {
      console.log('user : ', data);
      setUser(data);
    },
  });

  // 닉네임, 자기소개 Form
  useEffect(() => {
    if (getUser.isSuccess) {
      reset({ nickname: getUser.data.nickname });
      registerIntro.reset({ introduce: getUser.data.introduce });
    }
  }, [getUser.data, getUser.isSuccess, reset]);

  const onNicknameSubmit = async () => {
    if (user.nickname === watch('nickname')) {
      setFocus('nickname');
    } else {
      console.log(watch('nickname'));
      if (window.confirm('닉네임 수정하시겠습니까?')) {
        try {
          await authApi
            .patch('user/' + userId, { nickname: watch('nickname') })
            .then((res) => res.data);
          setMyState({ ...myState, nickname: watch('nickname') });
          alert('닉네임 저장 완료!');
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  const onSelfIntroSubmit = async () => {
    const watch = registerIntro.watch('introduce');
    console.log(user.introduce);
    console.log(watch);
    if (user.introduce === watch) {
      registerIntro.setFocus('introduce');
    } else {
      console.log(watch);
      if (window.confirm('자기소개 수정하시겠습니까?')) {
        try {
          await authApi
            .patch('user/' + userId, { introduce: watch })
            .then((res) => res.data);
          setMyState({ ...myState, introduce: watch });
          alert('자기소개 저장 완료!');
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  const [topics, setTopics] = useState([]);
  const getTopics = useQuery(
    ['user/topic/', userId],
    () => authApi.get('user/topic/' + userId).then((res) => res.data),
    {
      onSuccess: (data) => {
        // console.log(data)
        setTopics(data);
      },
    }
  );

  const [bookmarks, setBookmarks] = useState();
  const getBookmarks = useQuery(
    ['user/bookmark', userId],
    () =>
      authApi
        .get('user/bookmark', { params: { id: userId } })
        .then((res) => res.data),
    {
      onSuccess: (data) => {
        // console.log(data);
        setBookmarks(data);
      },
    }
  );

  // 해당 유저가 팔로우하고 있는 목록들
  const [followeingUsers, setFolloingUsers] = useState();
  const getFollowings = useQuery(
    ['user/following', userId],
    () => authApi.get('user/following/' + userId).then((res) => res.data),
    {
      onSuccess: (data) => {
        // console.log(data);
        setFolloingUsers(data);
      },
    }
  );

  if (getUser.isLoading) {
    return <h1>불러오는 중...</h1>;
  }

  return (
    <>
      {/* 데탑화면에 배경사진 나오는 헤더 */}
      {!isMobile && (
        <header
          className="header mx-8 mt-8 h-1/3 justify-end bg-transparent ps-[5rem] w-11/12 pb-8
          md:w-11/12 md:self-center"
        >
          <img
            src="/images/bg-bamboo.png"
            alt=""
            className="w-full h-full object-cover rounded-xl"
          />
        </header>
      )}
      {/* 메인 컨텐츠 박스 */}
      <main
        className="main rounded mx-4 mb-3 md:mb-3 mt-5 h-[88.5%] bg-transparent pt-9
       md:mx-8 md:w-11/12 md:mt-0 md:flex-row md:h-[60%] md:ps-[5rem] md:pt-0
      "
      >
        {/* 프로필 섹션 */}
        <section
          className="section h-[40%] min-h-[17rem] justify-around rounded-t-3xl rounded-b bg-transparent shadow-neutral-300 md:shadow-lg md:border-2 border-gray-200 relative
          md:w-1/3 md:h-full md:px-12 md:me-8 md:rounded-xl
        "
        >
          {!myPage &&
            (isFollowed ? (
              <button
                className="pink-button absolute bg-bamboo text-center border-solid border-2 border-bamboo top-10 right-0 max-w-[20%] z-10 h-7 px-2
            md:tracking-wider md:h-8 md:right-[3%]
            "
                onClick={() => setIsFollowed(false)}
              >
                Following
              </button>
            ) : (
              <button
                className="pink-button absolute text-bamboo bg-white text-center border-solid border-2 border-bamboo top-10 right-0 max-w-[20%] z-10 h-7
            md:tracking-wider md:h-8 md:right-[3%]
            "
                onClick={() => setIsFollowed(true)}
              >
                Follow
              </button>
            ))}
          {/* 프사 & 닉네임 & 이메일있는 아티클 */}
          <article
            className="article items-center relative h-24 bg-transparent
          "
          >
            <img
              src={user.image}
              alt=""
              className="min-w-[5rem] max-h-[5rem] max-w-[5rem] min-h-[5rem] absolute bottom-12 rounded-lg drop-shadow-lg bg-cover  object-cover z-10
             md:w-[7rem] md:bottom-20 md:aspect-square md:max-w-[50%]
             md:max-h-[7rem]
            "
            />
            <div
              className="absolute bottom-6 font-bold text-sm text-center 
               md:bottom-10 md:text-base
            "
            >
              {myPage ? (
                <form onSubmit={handleNicknameSubmit(onNicknameSubmit)}>
                  {/* <label htmlFor="nickname">{user.nickname}</label> */}
                  <input
                    id="nickname"
                    {...registerNickname('nickname', {
                      required: true,
                      pattern: /^[\uAC00-\uD7AFa-zA-Z0-9_\-]{2,15}$/,
                    })}
                    className="text-center h-6 min-w-[8rem] max-w-[50%] cursor-pointer  placeholder-black hover:border-2 hover:border-black rounded-md"
                    defaultValue={user.nickname}
                    onFocus={() => setInputFocus(true)}
                    onBlur={() => setTimeout(() => setInputFocus(false), 300)}
                  />
                  {isInputFocused && (
                    <button type="submit">
                      <CiEdit
                        size={20}
                        className="absolute right-4 z-10 cursor-pointer top-[0.2rem]"
                      />
                    </button>
                  )}
                  {nicknameErrors.nickname && (
                    <p className="absolute top-full left-0 text-center text-xs text-red-400 pointer-events-none z-10">
                      유효하지 않은 닉네임입니다
                    </p>
                  )}
                </form>
              ) : (
                user.nickname
              )}
            </div>
            <p
              className="absolute bottom-0 text-neutral-400 text-sm
               md:bottom-2
            "
            >
              {user.email}
            </p>
          </article>
          {/* 자기소개 & 유저인포 아티클 */}
          <article
            className="article h-4/6 px-4 bg-transparent
          md:h-[40%]
          "
          >
            <div
              className="h-2/3
            "
            >
              <p
                className="text-xs text-gray-500 border-b-4 border-b-lime-300 w-12
                 md:w-16 md:text-sm
              "
              >
                Introduce
              </p>
              {myPage ? (
                <form
                  action=""
                  onSubmit={registerIntro.handleSubmit(onSelfIntroSubmit)}
                  className="relative"
                >
                  <textarea
                    className="w-[90%] mt-3 h-[9rem] border-gray-300 rounded cursor-pointer resize-none hover:border-2 hover:border-black rounded-md"
                    {...registerIntro.register('introduce', {
                      // required: true,
                      maxLength: 40,
                    })}
                    defaultValue={user.introduce}
                    onFocus={() => setTextAreaFocus(true)}
                    onBlur={() =>
                      setTimeout(() => setTextAreaFocus(false), 300)
                    }
                  />
                  {isTextAreaFocused && (
                    <button type="submit">
                      <CiEdit
                        size={30}
                        className=" absolute bottom-2 z-10 cursor-pointer
                        md:right-10
                        "
                      />
                    </button>
                  )}
                </form>
              ) : (
                user.introduce
              )}
            </div>
          </article>
          {/* 카운트카운트 */}
          <>{cntDiv(isMobile, user)}</>
        </section>
        {/* 데탑화면에서 하나로 묶기용 div */}
        <div className="md:w-2/3 md:h-full h-[auto] shadow-neutral-300 md:shadow-lg md:border-t-2 md:border-2 border-gray-200 rounded-xl">
          {/* 메뉴 토클 버튼있는 섹션 */}
          <section
            className="section h-[2rem] flex-row justify-between w-full px-1 self-center bg-transparent
          md:absolute md:max-w-sm md:grid-cols-3 md:grid md:gap-2 md:my-1.5 md:h-[2.6rem]
          "
          >
            <div
              className={`${
                menu === 'topics' ? 'border-bamboo' : 'border-none'
              } border-b-4 bg-transparent box-content
            article w-1/4 min-w-[6rem] max-w-[8rem] items-center justify-center h-[2rem] z-10 
            md:h-[2.6rem] md:hover:cursor-pointer
            `}
              onClick={() => setMenu('topics')}
            >
              Topics
            </div>
            <div
              className={`${
                menu === 'follow' ? 'border-bamboo' : 'border-none'
              } border-b-4 bg-transparent box-content
            article w-1/4 min-w-[6rem] max-w-[8rem]  items-center justify-center h-[2rem] z-10 
            md:h-[2.6rem] md:hover:cursor-pointer
            `}
              onClick={() => setMenu('follow')}
            >
              Bookmark
            </div>
            <div
              className={`${
                menu === 'following' ? 'border-bamboo' : 'border-none'
              } border-b-4 bg-transparent box-content
            article w-1/4 min-w-[6rem] max-w-[8rem]  items-center justify-center h-[2rem] z-10 
            md:h-[2.6rem] md:hover:cursor-pointer
            `}
              onClick={() => setMenu('following')}
            >
              Following
            </div>
          </section>
          {/* 선택된 메뉴에 따라 내용 보여주는 섹션 */}
          <section
            className="section h-5/6 min-h-[15rem] bg- justify-center bg-transparent
            md:h-full md:pt-12
          "
          >
            {menu === 'topics' && (
              <article className="article h-full justify-center items-center bg-gray-300 rounded border-t-4 border-t-lime-300 grid grid-cols-2 gap-5 px-5 overflow-y-auto">
                <UserTopicsList topics={topics} />
              </article>
            )}
            {menu === 'follow' && (
              <article className="article h-full justify-center items-center bg-gray-300 rounded border-t-4 border-t-lime-300 grid grid-cols-2 gap-5 px-5 overflow-y-auto">
                <UserBookmarkList bookmarks={bookmarks} />
              </article>
            )}
            {menu === 'following' && (
              <article className="article h-full justify-center items-start bg-gray-300 rounded border-t-4 border-t-lime-300 grid grid-cols-2 gap-5 pt-5 px-5 overflow-y-auto">
                <UserFollowList followingUsers={followeingUsers} />
              </article>
            )}
          </section>
        </div>
      </main>
    </>
  );
};

export default ProfilePage;
