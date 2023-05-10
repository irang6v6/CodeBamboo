import { Intro } from '@/components/main/Intro';
import Main from '@/components/main/Main';
import { useEffect } from 'react';
import { isHomeState } from '@/recoil/isHome';
import { useSetRecoilState } from 'recoil';

export default function Home() {
  const setIsHome = useSetRecoilState(isHomeState);
  useEffect(() => {
    setIsHome(true);
    return () => {
      setIsHome(false);
    };
  }, []);
  return (
    <div className="w-full h-[800vh]">
      <Intro />
      <Main />
    </div>
  );
}
