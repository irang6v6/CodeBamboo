import React from 'react';

interface Props {
  context: string
}

export const AlertDialog = ({context}: Props) => {

  return (
      <div className='fixed top-[4rem] md:top-5 left-1/2 transform -translate-x-1/2 w-[50%] md:w-[12%] h-16 md:h-24 rounded-md bg-green-300 opacity-80 z-20 flex flex-col items-center justify-evenly min-w-max max-w-[50%] tracking-wider
      transition-all duration-500 ease-in-out 
      shadow-xl
      text-center 
      text-base
      font-bold 
      p-4
      '>
        <p>{context}</p>
        <div className="w-full h-1 bg-gray-200">
          <div className="h-full bg-green-500 transition-all duration-1000 ease-linear w-0 animate-width" />
        </div>
      </div>
  );
};

export default AlertDialog;
