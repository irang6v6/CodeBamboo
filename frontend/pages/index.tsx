import { Intro } from '@/components/main/Intro';
import Main from '@/components/main/Main';
import { useEffect } from 'react';
import { isHomeState } from '@/recoil/isHome';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '@/recoil/user';
import SearchModal from '@/components/search/SearchModal';

export const scrollTo700vh = () => {
  window.scrollTo({
    top: window.innerHeight * 7,
  });
};

export default function Home() {
  const setIsHome = useSetRecoilState(isHomeState);
  const user = useRecoilValue(userState);
  useEffect(() => {
    setIsHome(true);
    if (user.isLoggedIn) scrollTo700vh();
    return () => {
      setIsHome(false);
    };
  }, []);
  return (
    <div className="w-full h-[800vh]">
      <Intro />
      <Main />
      <SearchModal />
    </div>
  );
}
