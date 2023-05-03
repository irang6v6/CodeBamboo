import React from 'react';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { userState } from '@/recoil/user';

interface Props {
  isHovered: boolean
}

export const BarItems = ({ isHovered } : Props) => {
  const [user, setUser] = useRecoilState(userState)
  const HoverBarItems = isHovered ?
    <>
      <div>
        <Link href={"/topics"}><div>New</div></Link>
        <Link href={"/search"}><div>Search</div></Link>
      </div>
      <div  className="mb-8 flex items-center">
        <img src={user.image} alt="" className='h-12'/>
        <span>{user.nickname}</span>
      </div>
    </>
    :
    <>
      <div className=''>
        <Link href={"/topics"}><div>N</div></Link>
        <Link href={"/search"}><div>S</div></Link>
      </div>
      <div className="mb-8"><img src={user.image} alt="" className='h-12'/></div>
    </>


  return (
    <div className='bg-inherit z-10 flex flex-col
                    absolute top-20 right-0 h-screen w-1/2 
                    md:static md:h-full md:w-auto md:justify-between'>
      { HoverBarItems }
    </div>
  );
};
