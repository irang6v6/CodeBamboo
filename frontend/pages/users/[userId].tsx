import React, { useState } from 'react';
import { useRouter } from "next/router";
import { useRecoilValue } from 'recoil';
import { userState } from '@/recoil/user';
import useIsMobile from '@/hooks/useIsMobile';

interface Props {
}

export const UserDetail = ({ } : Props) => {
  const user = useRecoilValue(userState)
  const router = useRouter();
  const isMobile = useIsMobile()
  const [menu, setMenu] = useState('topics')

  return (
    <>
      {!isMobile && 
        <header className='header mx-8 mt-8 h-1/3 justify-end bg-transparent
          md:w-11/12 md:self-center'>
          <img src="/images/bg-bamboo.png" alt="" className='w-full h-full object-cover rounded-xl'/>
        </header>}
      <main className='main rounded mx-4 mb-4 mt-9 h-[80%] bg-transparent
        md:mx-8 md:w-11/12 md:mt-0 md:flex-row md:h-2/3
      '>
        <section className='section h-1/2 min-h-[20rem] justify-between rounded-t-3xl rounded-b border-4 border-bamboo
          md:w-1/3 md:h-5/6
        '>
          <article className='article items-center relative h-24 bg-transparent
          '>
            <img src={user.image} alt="" className='min-w-[5rem] absolute bottom-8 rounded-lg drop-shadow-md
              md:min-w-[8rem]
            '/>
            <p className='absolute bottom-1 font-bold
              md:text-lg md:-bottom-1
            '>
             {user.nickname}
            </p>
          </article> 
          <article className='article h-4/6 px-4 py-2 bg-transparent
          '>
            <div className='md:min-w-[14rem]'>
              <p className='text-md text-gray-500 border-b-4 border-b-lime-300 w-12'>Email</p>
              <div className='text-xl'>{user.email}</div>
            </div>
            <div className='h-2/3 mt-4 overflow-y-auto
            '>
              <p className='text-md text-gray-500 border-b-4 border-b-lime-300 w-12'>Introduce</p>
              <div className='text-lg'>
                {user.introduce}
                </div>
            </div>
          </article>
        </section>
        <div className='md:w-2/3 md:h-5/6'>
        <section className='section h-9 flex-row justify-between w-full my-1.5 px-1 self-center bg-transparent'>
            <div className={`${menu==='topics' ? 'bg-bamboo' : 'bg-gray-300'}
            article rounded-md w-1/4 min-w-[6rem] max-w-[8rem] items-center justify-center 
            `} 
            onClick={()=>setMenu('topics')}
            >
              Topics
            </div> 
            <div className={`${menu==='follow' ? 'bg-bamboo' : 'bg-gray-300'}
            article rounded-md w-1/4 min-w-[6rem] max-w-[8rem]  items-center justify-center 
            `} 
            onClick={()=>setMenu('follow')}
            >
              Follow
            </div> 
            <div className={`${menu==='following' ? 'bg-bamboo' : 'bg-gray-300'}
            article rounded-md w-1/4 min-w-[6rem] max-w-[8rem]  items-center justify-center 
            `} 
            onClick={()=>setMenu('following')}
            >
              Following
            </div> 
        </section>
        <section className='section h-1/2 min-h-[13rem] bg-transparent justify-center
          md:h-full
        '>
          {menu==='topics' &&
            <article className='article h-full justify-center items-center bg-gray-300 rounded-md'>
              <div className='w-5/6 h-5/6 flex justify-center items-center border-3 bg-white rounded-md'>
                토픽 아이템
              </div>
            </article> 
          }
          {menu==='follow' &&
            <article className='article h-full rounded-md border-4 border-bamboo bg-transparent'>
              팔로우
            </article> 
          }
          {menu==='following' &&
            <article className='article h-full rounded-md border-4 border-bamboo bg-transparent'>
              팔로잉
            </article> 
          }
        </section>
        </div>
      </main>
    </>
  );
};

export default UserDetail
