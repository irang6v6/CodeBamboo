import useIsMobile from '@/hooks/useIsMobile';
import { userState } from '@/recoil/user';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';

interface Props {
}

export const cntDiv = (isMobile:boolean)=>{
  return (
    <>
    {isMobile?
      <h1>아이콘</h1>
      :
      <div className='grid grid-cols-2 gap-2 mx-0 my-2 border-2 border-black-300 h-[25%] bg-transparent rounded'>
        <article className='article justify-center min-w-[10rem] items-start ps-2 bg-transparent text-lg'>
          Follwers // cnt 
        </article >
        <article className='article justify-center min-w-[10rem] items-start ps-2 bg-transparent text-lg'>
          Topics // cnt
        </article >
        <article className='article justify-center min-w-[10rem] items-start ps-2 bg-transparent text-lg'>
          Leafs // cnt
        </article >
        <article className='article justify-center min-w-[10rem] items-start ps-2 bg-transparent text-lg'>
          Bookmarks // cnt
        </article >
      </div>
      }
    </>
  )
}


export const MyPage = ({} : Props) => {
  const user   = useRecoilValue(userState)
  const isMobile = useIsMobile()
  const [menu, setMenu] = useState('topics')

  return (
    <>
      {/* 데탑화면에 배경사진 나오는 헤더 */}
      {!isMobile && 
        <header className='header mx-8 mt-8 h-1/3 justify-end bg-transparent ps-[5rem] w-11/12
          md:w-11/12 md:self-center'>
          <img src="/images/bg-bamboo.png" alt="" className='w-full h-full object-cover rounded-xl'/>
        </header>
      }
      {/* 메인 컨텐츠 박스 */}
      <main className='main rounded mx-4 mb-3 mt-5 h-[95%] bg-transparent pt-9 
       md:mx-8 md:w-11/12 md:mt-0 md:flex-row md:h-[60%] md:ps-[5rem] md:pt-0
      '>
        {/* 프로필 섹션 */}
        <section className='section h-[40%] min-h-[17rem] justify-around rounded-t-3xl rounded-b border-4 border-bamboo bg-transparent
          md:w-1/3 md:h-full md:px-12
        '>
          {/* 프사 & 닉네임 & 이메일있는 아티클 */}
          <article className='article items-center relative h-24 bg-transparent
          '>
            <img src={user.image} alt="" className='min-w-[5rem] max-h-[5rem] max-w-[5rem] min-h-[5rem] absolute bottom-16 rounded-lg drop-shadow-lg bg-auto
              md:min-w-[8rem] md:bottom-8 md:max-h-[8rem] md:min-h-[8rem]
            '/>
            <p className='absolute bottom-8 font-bold
              md:text-lg md:-bottom-1
            '>
              {user.nickname}
            </p>
            <p className='absolute bottom-2 text-neutral-400
              md:text-lg md:-bottom-7
            '>
              {user.email}
            </p>
          </article> 
          {/* 자기소개 & 유저인포 아티클 */}
          <article className='article h-4/6 px-4 bg-transparent
          md:h-[40%] md:pt-5
          '>
            <div className='h-2/3 overflow-y-auto
            '>
              <p className='text-xs text-gray-500 border-b-4 border-b-lime-300 w-12
                md:text-lg md:w-20
              '>Introduce</p>
              <div className='text-md
              md:text-lg xs:text-md
              '>
                {user.introduce}
                </div>
            </div>
          </article>
          {/* 카운트카운트 */}
          <>
          {cntDiv(isMobile)}
          </>
        </section>
        {/* 데탑화면에서 하나로 묶기용 div */}
        <div className='md:w-2/3 md:h-full h-[45%]'>
          {/* 메뉴 토클 버튼있는 섹션 */}
          <section className='section h-9 flex-row justify-between w-full my-1.5 px-1 self-center bg-transparent
          md:absolute md:max-w-sm md:grid-cols-3 md:grid md:gap-2
          '>
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
              Bookmark
            </div> 
            <div className={`${menu==='following' ? 'bg-bamboo' : 'bg-gray-300'}
            article rounded-md w-1/4 min-w-[6rem] max-w-[8rem]  items-center justify-center 
            `} 
            onClick={()=>setMenu('following')}
            >
              Follow
            </div> 
          </section>
          {/* 선택된 메뉴에 따라 내용 보여주는 섹션 */}
          <section className='section h-5/6 min-h-[13rem] bg- justify-center bg-transparent
            md:h-full md:pt-12
          '>
            {menu==='topics' &&
              <article className='article h-full justify-center items-center bg-gray-300 rounded-md'>
                <div className='w-5/6 h-5/6 flex justify-center items-center border-3 bg-white rounded-md'>
                  토픽 아이템
                </div>
              </article> 
            }
            {menu==='follow' &&
              <article className='article h-full rounded-md border-4 border-bamboo bg-transparent
              md:border-l-0 md:px-6 md:py-6
              '>
                즐겨찾기
              </article> 
            }
            {menu==='following' &&
              <article className='article h-full rounded-md border-4 border-bamboo bg-transparent
              md:border-l-0 md:px-6 md:py-6
        6     '>
                팔로우 || 팔로워
              </article> 
            }
          </section>
        </div>
      </main>
    </>
  );
};
