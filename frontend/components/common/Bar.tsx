import React, { useState } from 'react';
import Link from 'next/link';
import useIsMobile from '@/hooks/useIsMobile';
import useIsClient from '@/hooks/useIsClient';
import { BarItems } from './BarItems';
import { useRecoilValue } from 'recoil';
import { isHomeState } from '@/recoil/isHome';

export const Bar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isHome = useRecoilValue(isHomeState);
  const isMobile = useIsMobile();
  const isClient = useIsClient();

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const ResponsiveBarItems =
    isClient && isMobile ? (
      <>
        <div
          onClick={handleMenuClick}
          className="h-full w-20 flex justify-center items-center"
        >
          <img src="/images/icons/menu_icon.png" />
        </div>
        {isMenuOpen && (
          <BarItems isHovered={true} setIsMenuOpen={setIsMenuOpen} />
        )}
      </>
    ) : (
      <BarItems isHovered={isHovered} setIsMenuOpen={setIsMenuOpen} />
    );

  const Logo = isClient && (
    <Link href="/" onClick={() => setIsMenuOpen(false)}>
      {isMobile ? (
        <img src="/images/icons/bar_icon.png" alt="Bar Icon" />
      ) : (
        <div className='flex items-center mt-4 justify-between'>
        <img
          src="/images/icons/logo_icon.png"
          className=""
          alt="Logo Icon"
          />
          {isHovered && 
          <div className='flex flex-col font-bold tracking-wide ml-3'>
          {/* <p>Code</p> */}
          <p><span className='md:text-3xl md:font-semibold'>H</span>ome</p>
          </div>
          }
        </div>
      )}
    </Link>
  );

  return (
    <aside
      className={`flex text-center items-center z-40
                  flex-row justify-between h-20 text-white bg-black
                  ${isHome ? 'absolute top-[700vh]' : 'relative'} w-screen
                  md:flex-col md:justify-normal md:w-24 md:h-screen md:text-black md:bg-[#eff1f3]
                  md:hover:w-[11rem] md:transition-w md:duration-500 md:ease-in-out
                  md:items-start md:ps-4
                  ${isHome ? 'md:relative md:top-[700vh]' : 'md:bottom-0'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
    {Logo}
    {ResponsiveBarItems}
    </aside>
  );
};
