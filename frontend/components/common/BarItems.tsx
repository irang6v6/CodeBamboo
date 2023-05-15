import React from 'react';
import Link from 'next/link';
import { useSetRecoilState, useRecoilState } from 'recoil';
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
    const [user, setUser] = useRecoilState(userState);
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
                className="md:flex md:flex-col md:items-start md:ps-[6px]"
            >
                <Link
                    href={'/topics'}
                    className="md:flex md:items-center md:justify-between md:w-[7.5rem]"
                >
                    <img
                        src="/images/icons/more.png"
                        className="md:mt-8 md:h-9"
                    />
                    <div className="md:mt-8 md:h-9 md:text-xl md:tracking-wider">
                        <span className="md:text-3xl md:font-semibold">C</span>
                        reate
                    </div>
                </Link>
                <Link
                    href={'/search'}
                    className="md:flex md:items-center md:justify-between md:w-[7.5rem] md:box-content md:border-none"
                >
                    <img
                        src="/images/icons/search_icon.png"
                        className="md:mt-8 md:h-9"
                    />
                    <div className="md:mt-8 md:h-9 md:text-xl md:tracking-wider">
                        <span className="md:text-3xl md:font-semibold">S</span>
                        earch
                    </div>
                </Link>
            </div>
            <div
                id="profile-div"
                className="h-fit flex items-center cursor-pointer
                  md:mb-8 md:relative bottom-10"
                onClick={!user.isLoggedIn ? handleModalToggle : serveUserpage}
            >
                <img
                    src={user.image}
                    alt=""
                    className="h-12 w-12 rounded-lg shadow-sm object-cover"
                />
                <div className="ml-auto">
                    {user.isLoggedIn ? (
                        <>
                            <p className="md:w-[4.5rem]">{user.nickname}</p>
                        </>
                    ) : (
                        <button className="login-button md:w-[4.5rem]">
                            Login
                        </button>
                    )}
                </div>
            </div>
            {user.isLoggedIn && (
                <button
                    className="login-button px-0 tracking-wider
        md:w-[4rem] md:text-[10px] md:absolute md:bottom-5 md:right-3 
        "
                    onClick={() => {
                        if (window.confirm('로그아웃 하시겠습니까?'))
                            logoutMutaion.mutate();
                    }}
                >
                    로그아웃
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
                    <img
                        src="/images/icons/more.png"
                        className="md:mt-8 md:h-9"
                    />
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
                className="z-10 flex flex-col
                      absolute top-full right-0 h-80 w-1/2 
                      md:static md:h-full md:w-auto md:justify-between"
            >
                {HoverBarItems}
            </div>
            {MenuOpenBackground}
        </>
    );
};
