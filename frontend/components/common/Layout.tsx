import React from 'react';
import { Bar } from './Bar';

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children } : Props) => {
  return (
    <div className="flex h-screen w-screen
                    flex-col 
                    md:flex-row md:max-h-screen"
    >
      <Bar />
      <main className="h-full w-full">{children}</main>
    </div>
  );
};
