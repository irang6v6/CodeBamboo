import React, { useState } from 'react';
import Link from 'next/link';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { loginModalState, userState } from '@/recoil/user';
import { useRouter } from 'next/router';
import useLogout from '@/hooks/auth/useLogout';
import { BsQuestionSquare } from 'react-icons/bs';

interface Props {
  isHovered: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const BarItems = ({ isHovered, setIsMenuOpen }: Props) => {
  const user = useRecoilValue(userState);
  const setIsOpen = useSetRecoilState(loginModalState);
  const [isCreateHovered, setIsCreateHovered] = useState(false);
  const [isSearchHovered, setIsSearchHovered] = useState(false);
  const [isDocsHovered, setIsDocsHovered] = useState(false);
  const router = useRouter();

  const logoutMutaion = useLogout();

  const handleModalToggle = (event: React.MouseEvent) => {
    setIsOpen((prev) => !prev);
  };
  const serveUserpage = () => {
    router.push(`/users/${user.user_id}`);
  };
  const serveDocsPage = () => {
    router.push('/docs');
  };

  const HoverBarItems = isHovered ? (
    <>
      <div
        onClick={() => setIsMenuOpen(false)}
        className="flex flex-col h-fit md:items-start md:ps-[6px]"
      >
        <Link
          href={'/topics'}
          className="text-xl h-fit flex items-center justify-center mt-11
                    md:mt-0 md:justify-between md:w-[7.5rem]"
          onMouseEnter={() => setIsCreateHovered(true)}
          onMouseLeave={() => setIsCreateHovered(false)}
        >
          <img
            src={
              isCreateHovered
                ? '/images/icons/more_green.png'
                : '/images/icons/more.png'
            }
            className="hidden 
                                    md:block md:mt-8 md:h-9"
          />
          <div
            className={`${isCreateHovered ? 'md:text-bamboo' : ''}
              md:animate-fadein md:mt-8 md:h-9 md:text-xl md:tracking-wider `}
          >
            <span className="md:text-2xl md:font-semibold">C</span>
            reate
          </div>
        </Link>

        <Link
          href={'/search'}
          className="text-xl h-fit flex items-center justify-center mt-11
                    md:mt-0 md:justify-between md:w-[7.5rem] md:box-content md:border-none"
          onMouseEnter={() => setIsSearchHovered(true)}
          onMouseLeave={() => setIsSearchHovered(false)}
        >
          <img
            src={
              isSearchHovered
                ? '/images/icons/search_icon_green.png'
                : '/images/icons/search_icon.png'
            }
            className="hidden 
                                    md:block md:mt-8 md:h-9"
          />
          <div
            className={`${
              isSearchHovered ? 'text-bamboo' : ''
            } md:animate-fadein md:mt-8 md:h-9 md:text-xl md:tracking-wider`}
          >
            <span className="md:text-2xl md:font-semibold ">S</span>
            earch
          </div>
        </Link>
      </div>
      <div
        className="mb-8 cursor-pointer rounded-lg
      md:relative md:bottom-10 md:flex md:flex-col"
      >
        <div
          id="docs"
          className="h-fit flex items-center cursor-pointer
                    text-xl justify-center mt-11
                  md:mt-0 md:w-full md:justify-evenly md:-left-3 md:h-fit md:relative"
          onClick={serveDocsPage}
        >
          <div className="md:shrink-0 md:w-fit md:h-fit md:flex">
            <BsQuestionSquare className="hidden md:block md:mb-7" size={38} />
          </div>
          <div
            className={`${
              isDocsHovered ? 'md:text-bamboo' : ''
            }md:animate-fadein md:mb-7 md:h-9 md:text-xl md:tracking-wider `}
          >
            <span className="md:text-2xl md:font-semibold">I</span>
            nfo
          </div>
        </div>
        <div
          id="profile-div"
          className="h-20 flex items-center justify-around cursor-pointer mt-6
                  md:mt-0 md:h-fit md:relative"
          onClick={!user.isLoggedIn ? handleModalToggle : serveUserpage}
        >
          <img
            src={user.image}
            alt=""
            className="h-12 w-12 rounded-lg shadow-sm object-cover bg-white"
          />
          <div className="md:ml-auto md:animate-fadein">
            {user.isLoggedIn ? (
              <>
                <p className="text-lg md:text-base md:w-[4.5rem]">
                  {user.nickname}
                </p>
              </>
            ) : (
              <button className="login-button md:w-[4.5rem]">Login</button>
            )}
          </div>
        </div>
      </div>
      {user.isLoggedIn && (
        <button
          className="login-button mt-auto mb-2 h-10 px-0 tracking-[0.1rem] text-lg
                        md:animate-fadein md:h-8 md:w-[50%] md:text-[10px] md:absolute md:bottom-5 md:right-3 
        "
          onClick={() => {
            if (window.confirm('로그아웃 하시겠습니까?'))
              logoutMutaion.mutate();
          }}
        >
          Logout
        </button>
      )}
    </>
  ) : (
    // 호버 아닐 때
    <>
      <div
        className="flex flex-col items-center 
        md:flex md:flex-col md:justify-start"
      >
        <Link href={'/topics'}>
          <img src="/images/icons/more.png" className="md:mt-8 md:h-9" />
        </Link>
        <Link href={'/search'}>
          <img
            src="/images/icons/search_icon.png"
            className="md:mt-8 md:h-9 md:ps-[0.1rem] "
          />
        </Link>
      </div>
      <div
        className="mb-8 cursor-pointer rounded-lg
        md:relative md:bottom-10 md:flex md:flex-col md:items-center"
      >
        <BsQuestionSquare
          className="md:mb-7"
          size={38}
          onClick={serveDocsPage}
        />
        <div onClick={!user.isLoggedIn ? handleModalToggle : serveUserpage}>
          <img
            src={user.image}
            alt=""
            className="h-12 w-12 rounded-lg shadow-sm object-cover bg-white"
          />
        </div>
      </div>
    </>
  );

  const MenuOpenBackground = (
    <div
      className="bg-transparent absolute top-0 right-0 w-full h-screen
              md:hidden"
      onClick={() => setIsMenuOpen(false)}
    ></div>
  );

  return (
    <>
      <div
        className="z-10 flex flex-col bg-inherit
                      absolute top-full right-0 w-1/2 
                      md:bg-transparent md:static md:h-full md:w-auto md:justify-between"
      >
        {HoverBarItems}
      </div>
      {MenuOpenBackground}
    </>
  );
};
