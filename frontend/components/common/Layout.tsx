import React from 'react';
import { Bar } from './Bar';
import { useRecoilState } from 'recoil';
import { isIntroState } from '@/recoil/isIntro';

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  const [isIntro, setIsIntro] = useRecoilState(isIntroState);
  return (
    <div
      className="flex h-screen w-screen
                  flex-col 
                  md:flex-row"
    >
      {!isIntro && <Bar />}
      <main className="h-full w-full">{children}</main>
    </div>
  );
};
