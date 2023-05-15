import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { codeState } from '@/recoil/topic';
import { UnControlled as CodeItem } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import { Rendering } from './Rendering';
import { Article } from './Article';
import useIsMobile from '@/hooks/useIsMobile';

export const Editor = () => {
  const [code, setCode] = useRecoilState(codeState);
  const isMobile = useIsMobile();
  const [selectedLanguage, setSelectedLanguage] = useState('Content');
  const [initialCode, setInitialCode] = useState('');

  useEffect(() => {
    if (isMobile) return;
    setSelectedLanguage(code[0]?.language);
  }, [isMobile]);

  useEffect(() => {
    const selectedCode = code.find(
      (e) => e.language === selectedLanguage
    )?.content;
    setInitialCode(selectedCode || '');
  }, [selectedLanguage]);

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
    const tabs = code
      .filter((e) => languageOrder.includes(e.language))
      .sort((a, b) => {
        return (
          languageOrder.indexOf(a.language) - languageOrder.indexOf(b.language)
        );
      })
      .map((e) => e.language);

    return (
      <div className="flex flex-row h-16 overflow-x-scroll scrollbar-hide">
        {tabs.map((tab) => (
          <div
            key={tab}
            onClick={() => setSelectedLanguage(tab)}
            className={`editor-tab w-24 ${
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
        className="flex flex-col h-full
      
                      md:w-1/2"
      >
        <Tabs />
        <div className="h-full">
          {selectedLanguage !== 'Content' ? (
            <CodeItem
              className="h-full
                          text-base
                          md:text-lg"
              value={initialCode}
              onChange={handleChange}
              options={{
                mode: 'xml',
                theme: 'material',
                lineNumbers: true,
                // imeMode: 'disabled',
                // spellcheck: false,
                // inputStyle: "contenteditable",
                // lint: 'true',
              }}
              autoScroll={true}
            />
          ) : (
            <Article />
          )}
        </div>
      </div>
      <div
        className="h-full
      
                      md:w-1/2"
      >
        {!isMobile && <Article />}
        <Rendering />
      </div>
    </div>
  );
};

export default Editor;
