import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { codeState } from '@/recoil/topic';

export const Rendering = () => {
  const code = useRecoilValue(codeState);
  const [src, setSrc] = useState('');
  const html = code?.find((e) => e.language === 'HTML')?.content;
  const css = code?.find((e) => e.language === 'CSS')?.content;
  const js = code?.find((e) => e.language === 'JavaScript')?.content;

  const srcCode = `
    <html>
      <body>${html ? html : ''}</body>
      <style>
      body,html{
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
      }
      body{
        display: flex;
        justify-content: center;
        align-items: center;
      }
      ${css}
      </style>
      <script>${js}</script>
    </html>
  `;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrc(srcCode);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [srcCode]);

  return (
    <div className="h-1/2 w-full border">
      <iframe
        className="h-full w-full"
        srcDoc={src}
        sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-scripts allow-top-navigation-by-user-activation allow-downloads allow-presentation"
        allow="accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write"
        scrolling="auto"
        // allowTransparency={true} // TS 에러가 나거나 콘솔에 뜸
        loading="lazy"
      />
    </div>
  );
};
