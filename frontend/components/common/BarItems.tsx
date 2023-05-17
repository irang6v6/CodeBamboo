import React from 'react';
import Link from 'next/link';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { loginModalState, userDefault, userState } from '@/recoil/user';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import authApi from '@/hooks/api/axios.authorization.instance';
import useLogout from '@/hooks/auth/useLogout';
import { toggleSearchModal } from '@/recoil/search';

interface Props {
  isHovered: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const BarItems = ({ isHovered, setIsMenuOpen }: Props) => {
  const user = useRecoilValue(userState);
  const setIsOpen = useSetRecoilState(loginModalState);
  const router = useRouter();

  const logoutMutaion = useLogout();

  const handleModalToggle = (event: React.MouseEvent) => {
    setIsOpen((prev) => !prev);
  };
  const serveUserpage = () => {
    router.push(`/users/${user.user_id}`);
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
        >
          <img
            src="/images/icons/more.png"
            className="hidden 
                                    md:block md:mt-8 md:h-9"
          />
          <div className="md:animate-fadein md:mt-8 md:h-9 md:text-xl md:tracking-wider">
            <span className="md:text-2xl md:font-semibold">C</span>
            reate
          </div>
        </Link>
        <Link
          href={'/search'}
          className="text-xl h-fit flex items-center justify-center mt-11
                    md:mt-0 md:justify-between md:w-[7.5rem] md:box-content md:border-none"
        >
          <img
            src="/images/icons/search_icon.png"
            className="hidden 
                                    md:block md:mt-8 md:h-9"
          />
          <div className="md:animate-fadein md:mt-8 md:h-9 md:text-xl md:tracking-wider">
            <span className="md:text-2xl md:font-semibold">S</span>
            earch
          </div>
        </Link>
      </div>
      <div
        id="profile-div"
        className="h-20 flex items-center justify-around cursor-pointer mt-6
                md:mt-0 md:h-fit md:mb-8 md:relative md:bottom-10"
        onClick={!user.isLoggedIn ? handleModalToggle : serveUserpage}
      >
        <img
          src={user.image}
          alt=""
          className="h-12 w-12 rounded-lg shadow-sm object-cover"
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
      {user.isLoggedIn && (
        <button
          className="login-button mt-auto mb-2 h-14 px-0 tracking-wider text-lg
                        md:animate-fadein md:h-8 md:w-[75%] md:text-[10px] md:absolute md:bottom-5 md:right-3 
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
        className="mb-8 cursor-pointer
        md:relative md:bottom-10
      "
        onClick={!user.isLoggedIn ? handleModalToggle : serveUserpage}
      >
        <img
          src={user.image}
          alt=""
          className="h-12 w-12 rounded-lg shadow-sm object-cover"
        />
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
                      absolute top-full right-0 h-80 w-1/2 
                      md:bg-transparent md:static md:h-full md:w-auto md:justify-between"
      >
        {HoverBarItems}
      </div>
      {MenuOpenBackground}
    </>
  );
};
