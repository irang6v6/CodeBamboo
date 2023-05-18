import React from 'react';
import Loading from '@/components/common/Loading';

interface Props {
}

export const Panda = ({ } : Props) => {

  return (
    <div className='h-full w-full flex flex-col justify-center items-center bg-[#69AF9A] text-white text-xl'>
      <span className='font-scp text-3xl mb-5'>404 Error</span>
      <span>잘못된 접근입니다</span>
      <Loading />
      <span className='text-2xl mb-5'>팬더 기사단</span>
      <span>권태형 남이랑 신동찬 양주연 윤서용 지원석</span>
    </div>
  );
};

export default Panda