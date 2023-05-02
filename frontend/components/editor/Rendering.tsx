import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { codeState } from '@/recoil/topic';

export const Rendering = () => {
  const code = useRecoilValue(codeState);
  const [src, setSrc] = useState('');
  const html = code.find((e) => e.language === 'HTML')?.content;
  const css = code.find((e) => e.language === 'CSS')?.content;
  const js = code.find((e) => e.language === 'JavaScript')?.content;

  const srcCode = `
    <html>
      <body>${html}</body>
      <style>${css}</style>
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
    <div>
      <iframe
        srcDoc={srcCode}
        sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation allow-downloads allow-presentation"
        allow="accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write"
        scrolling="auto"
        // allowTransparency={true} // TS 에러가 나거나 콘솔에 뜸
        loading="lazy"
      />
    </div>
  );
};
