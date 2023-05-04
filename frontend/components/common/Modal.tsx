import { loginModalState, toggleLoginModal } from '@/recoil/user';
import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

function Modal() {
  const loginModal = useRecoilValue(loginModalState)
  const handleIsModalOpen = useSetRecoilState(toggleLoginModal); 

  const modalWrapperClasses = `
    ${loginModal.isOpen ? '' : 'modal-wrapper-hidden'}
    modal-wrapper
  `;

  const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI
  // 카카오
  const API_KEY_KAKAO = process.env.NEXT_PUBLIC_API_KEY_KAKAO
  const OAUTH_KAKAO = `https://kauth.kakao.com/oauth/authorize?client_id=${API_KEY_KAKAO}&redirect_uri=${REDIRECT_URI+'kakao'}&response_type=code`
  // 네이버
  const client_id = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID
  const state = process.env.NEXT_PUBLIC_NAVER_STATE_TOKEN
  const OAUTH_NAVER = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' + client_id + '&redirect_uri=' + REDIRECT_URI + 'naver' + '&state=' + state
  // 깃허브
  const github_client_id = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID
  const OAUTH_GITHUB = `https://github.com/login/oauth/authorize?client_id=${github_client_id}`

  return (
    <div className={`${modalWrapperClasses} bgImg-bamboo items-start w-full h-full border-none
                    md:w-4/5 md:h-4/5
    `}>
      <div className='wrapper bg-neutral-50/95 h-full w-full relative md:rounded-xl
      '>
        <header className='header flex-row items-center justify-center absolute top-2 left-2 
        md:w-auto bg-transparent
        '>
          <img src='/images/codebambooLogo.png' alt="" className='w-16'/>
          <h1 className='text-md font-bold'>Code Bamboo</h1>
        </header>
        <main className='main border-none h-1/2 justify-between
        md:h-2/3 bg-transparent
        '>
          <article className='article w-full h-28 justify-around border-none
          md:h-36 md:w-full bg-transparent
          '>
            <h1 className='text-2xl font-bold'>Login</h1>
            <p className='text-sm'>손쉽게 자신의 컴포넌트를 생성하세요.<br/>다른 유저의 컴포넌트 개선에 참여하세요.</p>
          </article>
          <article className='article h-36 justify-between items-center border-none
          md:w-full bg-transparent
          '>
            <a href={OAUTH_NAVER}>
              <img src="/images/naver_login.png" alt="" className='rounded'/>
            </a>
            <a href={OAUTH_KAKAO}>
              <img src="/images/kakao_login.png" alt="" className='rounded'/>
            </a>
            <a href={OAUTH_GITHUB}>
              <img src="/images/github_login.png" alt="" className='rounded'/>
            </a>
          </article>
        </main>
        <footer className="footer absolute bottom-3 right-3">
          <img src='/images/prev.png' className='cursor-pointer'
            onClick={handleIsModalOpen}
            />
        </footer>
      </div>
    </div>
  );
}

export default Modal;
