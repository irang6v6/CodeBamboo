import React from 'react';
import { Bar } from './Bar';

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children } : Props) => {
  return (
    <div className="flex min-h-screen
                    flex-col 
                    md:flex-row "
    >
      <Bar />
      <main className="flex-grow">{children}</main>
    </div>
  );
};
