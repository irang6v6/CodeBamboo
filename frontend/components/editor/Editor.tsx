import React, { useState, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { codeState } from '@/recoil/topic';
import { Controlled as CodeItem } from 'react-codemirror2';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/css/css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import { Rendering } from './Rendering';

export const Editor = () => {
  const [code, setCode] = useRecoilState(codeState);
  const [selectedLanguage, setSelectedLanguage] = useState(code[0].language);

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

  const selectedCode = code.find((e) => e.language === selectedLanguage);

  const Tabs = () => {
    const tabs = code.map((e) => e.language);
    return (
      <div>
        {tabs.map((tab) => (
          <div key={tab} onClick={()=>setSelectedLanguage(tab)}>{`${tab}`}</div>
        ))}
      </div>
    );
  };

  const editorRef = useRef<any>(null)
  const wrapperRef = useRef<any>(null)
  const editorWillUnmount = () => {
    editorRef.current.display.wrapper.remove();
    if (wrapperRef.current) {
      wrapperRef.current.hydrated = false;
    }
  }

  return (
    <>
      LeafItem
      Selected = {selectedLanguage}
      <Tabs />
      <CodeItem
        className='flex flex-col h-1/2 w-1/2'
        value={selectedCode?.content || ''}
        onBeforeChange={(editor, data, value)=>handleChange(editor, data, value)}
        options={{
          mode: 'xml',
          theme: 'material',
          lineNumbers: true,
        }}
        ref={wrapperRef}
        editorDidMount={(e) => editorRef.current = e}
        editorWillUnmount={editorWillUnmount}
      />
      <Rendering/>
    </>
  );
};

export default Editor;
