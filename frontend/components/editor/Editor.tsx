import React, { useState, useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { codeState } from '@/recoil/topic';
import { UnControlled as CodeItem } from 'react-codemirror2';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/css/css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import { Rendering } from './Rendering';
import { Article } from './Article';
import useIsMobile from '@/hooks/useIsMobile';

export const Editor = () => {
  const [code, setCode] = useRecoilState(codeState);
  const isMobile = useIsMobile();
  const [selectedLanguage, setSelectedLanguage] = useState(code[0].language);
  const [initialCode, setInitialCode] = useState(code[0].content || "")

  useEffect(() => {
    if (isMobile) return;
    setSelectedLanguage(code[0].language);
  }, [isMobile]);
  
  useEffect(() => {
    const selectedCode = code.find((e) => e.language === selectedLanguage)?.content;
    setInitialCode(selectedCode || "")
  },[selectedLanguage])
  
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
        return languageOrder.indexOf(a.language) - languageOrder.indexOf(b.language);
      })
      .map((e) => e.language);

    return (
      <div className='flex flex-row'>
        {tabs.map((tab) => (
          <div
            className={`flex w-28 h-16 text-center text-white items-center justify-center
                        ${selectedLanguage === tab ? 'font-bold bg-bamboo' : 'bg-editor'}`}
            key={tab}
            onClick={() => setSelectedLanguage(tab)}
          >
            {`${tab}`}
          </div>
        ))}
        {isMobile && (
          <div
            className={`flex w-20 h-16 text-center text-white items-center justify-center
                      ${selectedLanguage === 'Content' ? 'font-bold bg-bamboo' : 'bg-editor'}`}
          onClick={()=>setSelectedLanguage('Content')}
          >
            Text
          </div>
        )}
      </div>
    );
  };

  return (
    <div className='flex h-full
                    flex-col
                    md:flex-row'>
      <div className='flex flex-col h-full
      
                      md:w-1/2'>
        <Tabs />
        <div className='h-full'>
          { selectedLanguage !== 'Content' ?
            <CodeItem
              className='h-full
                        text-base
                        md:text-lg'
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
              autoScroll={false}
            />
            :
            <Article />
          }
        </div>
      </div>
      <div className='h-full
      
                      md:w-1/2'>
        {!isMobile && <Article />}
        <Rendering/>
      </div>
    </div>
  );
};
 
export default Editor;
