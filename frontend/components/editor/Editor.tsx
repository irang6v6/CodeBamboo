import React, { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { codeState, gptTrigger, selectedLeafState } from '@/recoil/topic';
import { UnControlled as CodeItem } from 'react-codemirror2';
import { Rendering } from './Rendering';
import { Article } from './Article';
import useIsMobile from '@/hooks/useIsMobile';
import useIsClient from '@/hooks/useIsClient';

export const Editor = () => {
  const [code, setCode] = useRecoilState(codeState);
  const selectedLeaf = useRecoilValue(selectedLeafState)
  const isMobile = useIsMobile();
  const isClient = useIsClient();
  const [selectedLanguage, setSelectedLanguage] = useState('HTML');
  const [initialCode, setInitialCode] = useState('');
  const codeUpdateTrigger = useRecoilValue(gptTrigger) 

  const mode: any = {
    HTML: 'htmlmixed',
    CSS: 'css',
    JavaScript: 'javascript',
  };

  useEffect(() => {
    if (isMobile) return;
    setSelectedLanguage('HTML');
  }, [isMobile]);

  useEffect(() => {
    if (!code) return;
    const selectedCode = code.find(
      (e) => e.language === selectedLanguage
    )?.content;
    setInitialCode(selectedCode || '');
  }, [selectedLanguage, selectedLeaf, codeUpdateTrigger]);

  const handleChange = (editor: any, data: any, value: string) => {
    const selectedCodeIndex = code.findIndex(
      (e) => e.language === selectedLanguage
    );
    const updatedCode = [...code];
    updatedCode[selectedCodeIndex] = {
      ...updatedCode[selectedCodeIndex],
      content: value,
    };
    setCode(updatedCode);
  };

  const Tabs = () => {
    const languageOrder = ['HTML', 'CSS', 'JavaScript'];
    const filteredCode = code || [];
    const tabs = filteredCode
      .filter((e) => languageOrder.includes(e.language))
      .sort((a, b) => {
        return (
          languageOrder.indexOf(a.language) - languageOrder.indexOf(b.language)
        );
      })
      .map((e) => e.language);

    return (
      <div className="flex flex-row h-16 overflow-x-scroll scrollbar-hide shrink-0 w-full">
        {tabs.map((tab) => (
          <div
            key={tab}
            onClick={() => setSelectedLanguage(tab)}
            className={`editor-tab h-16 w-24 ${
              selectedLanguage === tab
                ? 'font-bold bg-bamboo text-white'
                : 'bg-gray-300'
            }`}
          >
            {`${tab}`}
          </div>
        ))}
        {isMobile && (
          <div
            onClick={() => setSelectedLanguage('Content')}
            className={`editor-tab w-20 ${
              selectedLanguage === 'Content'
                ? 'font-bold bg-bamboo text-white'
                : 'bg-gray-300'
            } justify-end`}
          >
            Text
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className="flex h-full w-full
                    flex-col
                    md:flex-row"
    >
      <div
        className="box-border flex flex-col h-full
      
                      md:w-1/2"
      >
        <Tabs />
        <div className="h-full overflow-y-hidden">
          {selectedLanguage !== 'Content' ? (
            <>
              {isClient && <CodeItem
                className="h-full
                            text-base
                            md:text-lg"
                value={initialCode}
                onChange={handleChange}
                options={{
                  mode: mode[selectedLanguage],
                  theme: 'material',
                  lineNumbers: true,
                  scrollbarStyle: 'null',
                  lineWrapping: true,
                }}
              />}
            </>
          ) : (
            <div className="h-full">
              <Article />
              <Rendering />
            </div>
          )}
        </div>
      </div>
      {!isMobile && (
        <div className={`h-full w-1/2`}>
          <Article />
          <Rendering />
        </div>
      )}
    </div>
  );
};

export default Editor;
