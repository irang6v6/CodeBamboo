import { loginModalState } from '@/recoil/user';
import React, { useRef, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import Draggable from 'react-draggable';
import useIsMobile from '@/hooks/useIsMobile';
import { useRouter } from 'next/router';

function Modal() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useRecoilState(loginModalState);
  const [Opacity, setOpacity] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const isMobile = useIsMobile();

  const modalWrapperClasses = `
    ${isOpen ? '' : 'modal-wrapper-hidden'}
    modal-wrapper
  `;

  useEffect(() => {
    if (!isOpen) {
      setModalPosition({ x: 0, y: 0 });
    }
  }, [isOpen]);

  const handleStart = () => {
    setOpacity(true);
  };
  const handleEnd = () => {
    setOpacity(false);
  };

  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        event.target.className !== 'login-button' &&
        event.target.parentNode.id !== 'profile-div'
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalRef]);

  const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;
  // 카카오
  const API_KEY_KAKAO = process.env.NEXT_PUBLIC_API_KEY_KAKAO;
  const OAUTH_KAKAO = `https://kauth.kakao.com/oauth/authorize?client_id=${API_KEY_KAKAO}&redirect_uri=${
    REDIRECT_URI + 'kakao'
  }&response_type=code`;
  // 네이버
  const client_id = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
  const state = process.env.NEXT_PUBLIC_NAVER_STATE_TOKEN;
  const OAUTH_NAVER =
    'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' +
    client_id +
    '&redirect_uri=' +
    REDIRECT_URI +
    'naver' +
    '&state=' +
    state;
  // 깃허브
  const github_client_id = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
  const OAUTH_GITHUB = `https://github.com/login/oauth/authorize?client_id=${github_client_id}`;

  return (
    <Draggable
      position={modalPosition}
      onStart={handleStart}
      onStop={handleEnd}
      disabled={isMobile}
    >
    <div ref={modalRef} className={`${modalWrapperClasses} ${Opacity? 'opacity-70' : 'opacity-100'} bgImg-bamboo items-start w-full h-full min-h-[40rem] border-none z-40
      md:w-4/5 md:h-4/5
    `}>
      <div className='modal-inner-wrapper bg-neutral-50/95 h-full w-full min-w-[25rem] relative md:rounded-xl
      '>
        <header className='header flex-row items-center justify-center absolute top-2 left-2 
        md:w-auto bg-transparent
        '
          >
            <img src="/images/codebambooLogo.png" alt="" className="w-16" />
            <h1 className="text-md font-bold">Code Bamboo</h1>
          </header>
          <main
            className="main border-none h-1/2 justify-between
        md:h-2/3 bg-transparent
        "
          >
            <article
              className="article w-full h-28 justify-around border-none
          md:h-36 md:w-full bg-transparent
          "
            >
              <h1 className="text-2xl font-bold">Login</h1>
              <p className="text-sm">
                손쉽게 자신의 컴포넌트를 생성하세요.
                <br />
                다른 유저의 컴포넌트 개선에 참여하세요.
              </p>
            </article>
            <article
              className="article h-36 justify-between items-center border-none
          md:w-full bg-transparent
          ">
            <a href={OAUTH_NAVER} onClick={()=>localStorage.setItem('prevPath', router.asPath)}>
              <img src="/images/naver_login.png" alt="" className='rounded'/>
            </a>
            <a href={OAUTH_KAKAO} onClick={()=>localStorage.setItem('prevPath', router.asPath)}>
              <img src="/images/kakao_login.png" alt="" className='rounded'/>
            </a>
            <a href={OAUTH_GITHUB} onClick={()=>localStorage.setItem('prevPath', router.asPath)}>
              <img src="/images/github_login.png" alt="" className='rounded'/>
            </a>
          </article>
        </main>
        <footer className="footer absolute bottom-3 right-5 bg-transparent">
          <img src='/images/prev.png' className='cursor-pointer'
            onClick={()=>setIsOpen(prev=>!prev)}
            />
          </footer>
        </div>
      </div>
    </Draggable>
  );
}

export default Modal;
