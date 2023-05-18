import React from 'react';
import { CodeInF } from './TopicInterface';
import { useRouter } from 'next/router';

interface Props {
  codes: CodeInF[];
  topic_id: string;
}

export const TopicItemRendering = ({ codes, topic_id }: Props) => {
  const router = useRouter();
  const html = codes.find((e) => e.language === 'HTML')?.content;
  const css = codes.find((e) => e.language === 'CSS')?.content;
  const js = codes.find((e) => e.language === 'JavaScript')?.content;

  const srcCode = `
    <html>
      <body>${html ? html : ''}</body>
      <style>
      body,html{
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        overflow: hidden; 
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

  return (
    <div className="h-full w-full scrollbar-hide">
      <iframe
        className="h-full w-full"
        srcDoc={srcCode}
        sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-scripts allow-top-navigation-by-user-activation allow-downloads allow-presentation"
        allow="accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write"
        // allowTransparency={true} // TS 에러가 나거나 콘솔에 뜸
        loading="lazy"
      />
    </div>
  );
};
