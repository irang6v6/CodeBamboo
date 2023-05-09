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
      <header className='header h-6 bg-transparent'/>
      <main className='main rounded mx-4 my-4 h-auto bg-transparent'>
        <section className='section h-72 justify-between rounded-t-3xl rounded-b border-4 border-bamboo bg-transparent'>
          <article className='article items-center relative h-20 bg-transparent'>
            {user.nickname}
            <img src={user.image} alt="" className='w-24 absolute bottom-2 rounded-lg drop-shadow-md'/>
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
        <section className='section h-10 flex-row justify-between my-1 bg-transparent'>
          <article className={`${menu==='topics' ? 'bg-bamboo' : 'bg-gray-300'}
          article rounded-md w-24 items-center justify-center 
          `} 
          onClick={()=>setMenu('topics')}
          >
            Topics
          </article> 
          <article className={`${menu==='follow' ? 'bg-bamboo' : 'bg-gray-300'}
          article rounded-md w-24 items-center justify-center 
          `} 
          onClick={()=>setMenu('follow')}
          >
            Follow
          </article> 
          <article className={`${menu==='following' ? 'bg-bamboo' : 'bg-gray-300'}
          article rounded-md w-24 items-center justify-center 
          `} 
          onClick={()=>setMenu('following')}
          >
            Following
          </article> 
        </section>
        <section className='section h-52 bg-transparent'>
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
