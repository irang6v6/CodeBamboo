import React, { useState } from 'react';
import Link from 'next/link';
import useIsMobile from '@/hooks/useIsMobile';
import { BarItems } from './BarItems';

export const Bar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const ResponsiveBarItems = isMobile ? (
    <>
      <div onClick={handleMenuClick}>Menu</div>
      {isMenuOpen && <BarItems isHovered={true} />}
    </>
  ) : (
    <BarItems isHovered={isHovered} />
  );

  return (
    <aside
      className="bg-sky-900 text-white relative flex text-center  
                flex-row justify-between h-20
                md:flex-col md:justify-normal md:w-24 md:h-screen md:hover:w-48 md:transition-w md:duration-500 md:ease-in-out"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href="/">Logo</Link>
      {ResponsiveBarItems}
    </aside>
  );
};
