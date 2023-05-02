import { atom } from "recoil";


export interface CodeObject {
  codeId: number;
  language: string;
  content: string;
}

export const codeState = atom<CodeObject[]>({
  key: "codeState",
  default: [
    {
      codeId : 3,
      language : 'JavaScript',
      content : ""
    },
    {
      codeId : 1,
      language : 'HTML',
      content : "<h1>예시 코드</h1>"
    },
    {
      codeId : 2,
      language : 'CSS',
      content : `h1 {
        color: red
      }`
    }
   ],
});