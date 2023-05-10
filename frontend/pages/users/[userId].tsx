import React, { useState } from 'react';
import { useRouter } from "next/router";
import { useRecoilValue } from 'recoil';
import { userState } from '@/recoil/user';

interface Props {
}

export const UserDetail = ({ } : Props) => {
  const user = useRecoilValue(userState)
  const router = useRouter();
  const [menu, setMenu] = useState('topics')

  return (
    <>
      <main className='main rounded mx-4 mb-4 mt-9 h-[90%] bg-transparent
        md:mx-auto
      '>
        <section className='section h-1/2 min-h-[18rem] justify-between rounded-t-3xl rounded-b border-4 border-bamboo bg-transparent
          md:flex-row
        '>
          <article className='article items-center relative h-24 bg-
            md:h-full md:static md:justify-center
          '>
            <img src={user.image} alt="" className='min-w-[6rem] absolute bottom-8 rounded-lg drop-shadow-md
              md:static
            '/>
            <p className='absolute bottom-1 font-bold
              md:static
            '>
             {user.nickname}
            </p>
          </article> 
          <article className='article h-4/6 px-4 pb-0 bg-transparent'>
            <div>
              <p className='text-sm text-gray-500 border-b-4 border-b-lime-300 w-12'>Email</p>
              <div className=''>{user.email}</div>
            </div>
            <div className='h-2/3 mt-2'>
              <p className='text-sm text-gray-500 border-b-4 border-b-lime-300 w-12'>Introduce</p>
              <div className=''>{user.introduce}</div>
            </div>
          </article>
        </section>
        <section className='section h-10 flex-row justify-between w-[345px] max-w-[505px] my-1.5 px-0.5 self-center bg-transparent'>
          <article className={`${menu==='topics' ? 'bg-bamboo' : 'bg-gray-300'}
          article rounded-md w-1/4 min-w-[6rem] max-w-[8rem] items-center justify-center 
          `} 
          onClick={()=>setMenu('topics')}
          >
            Topics
          </article> 
          <article className={`${menu==='follow' ? 'bg-bamboo' : 'bg-gray-300'}
          article rounded-md w-1/4 min-w-[6rem] max-w-[8rem]  items-center justify-center 
          `} 
          onClick={()=>setMenu('follow')}
          >
            Follow
          </article> 
          <article className={`${menu==='following' ? 'bg-bamboo' : 'bg-gray-300'}
          article rounded-md w-1/4 min-w-[6rem] max-w-[8rem]  items-center justify-center 
          `} 
          onClick={()=>setMenu('following')}
          >
            Following
          </article> 
        </section>
        <section className='section h-1/2 min-h-[13rem] bg-transparent justify-center'>
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
      </main>
    </>
  );
};

export default UserDetail
