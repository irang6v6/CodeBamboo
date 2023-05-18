import React, { useEffect, useState } from 'react';
import useIsMobile from '@/hooks/useIsMobile';
import useIsClient from '@/hooks/useIsClient';
import { scrollTo700vh } from '@/pages';

export const Intro = () => {
  const isMobile = useIsMobile();
  const isClient = useIsClient();
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = winScroll / height;
      setScrollPercent(Math.round(scrolled * 100));
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const ResponsiveIntro = (
    <>
      <div
        className="fixed z-20 p-0 m-0 flex items-center justify-start
                    w-[60%] h-auto top-6 left-6
                    md:w-1/5 md:top-10 md:left-10"
      >
        <img src='images/icons/bar_icon.png'/>
        <div className=' text-white items-center text-[1.6rem] font-semibold 
        md:font-bold md:text-[2.5rem]'
        >CodeBamboo</div>
      </div>
      <h1
        className="text-white font-bold fixed z-20
                  text-2xl left-8 top-[30%]
                  md:text-4xl md:text-center md:top-[35%] md:left-0 md:w-screen"
        style={{
          opacity: `${scrollPercent * 6}%`,
          transform: `translateY(${
            scrollPercent * 6 < 100 ? 100 - scrollPercent * 6 : 0
          }%)`,
        }}
      >
        손쉽게 주제를 생성하고,
        {isClient && isMobile ? <br /> : ' '}
        당신의 컴포넌트를
      </h1>
      <h1
        className="text-white font-bold fixed z-20
                  text-2xl right-8 top-[60%] text-end
                  md:text-4xl md:text-center md:top-[60%] md:left-0 md:w-screen"
        style={{
          opacity: `${scrollPercent * 4 - 100}%`,
          transform: `translateY(${
            scrollPercent * 4 - 100 < 100 ? 100 - (scrollPercent * 4 - 100) : 0
          }%)`,
        }}
      >
        실시간 랜더링과 함께
        {isClient && isMobile ? <br /> : ' '}
        더욱 생생하게 공유하세요
      </h1>
    </>
  );

  return (
    <div
      className="intro-container"
      style={{
        opacity: `${scrollPercent > 41 ? 1 - (scrollPercent - 41) / 50 : 1}`,
      }}
    >
      <div
        className="bg-green-300 h-2 fixed top-0 left-0 right-0 z-20"
        style={{ width: `${scrollPercent}%` }}
      ></div>
      <div
        className="bgImg-bamboo bgImg-position w-full h-screen fixed top-0 left-0 z-0"
        style={{
          transform: `scale(${1 + scrollPercent / 300})`,
        }}
      ></div>
      <div
        className="bg-black w-full h-screen fixed top-0 left-0 z-10"
        style={{
          opacity: `${scrollPercent < 41 ? scrollPercent / 82 : 0.5}`,
        }}
      ></div>
      {ResponsiveIntro}
      <div
        className="scroll-arrow fixed left-1/2 bottom-6 animate-scrollArrow z-10
                  w-10 h-10 transfrom hover:scale-110 cursor-pointer
                  md:w-20 md:h-20"
        style={{ transform: `translateX(-50%)` }}
        onClick={()=>scrollTo700vh()}
      ></div>
    </div>
  );
};
