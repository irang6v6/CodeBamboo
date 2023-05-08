import { atom } from 'recoil';

export interface CodeObject {
  codeId: number;
  language: string;
  content: string | null;
}

export const codeState = atom<CodeObject[]>({
  key: 'codeState',
  default: [
    {
      codeId: 3,
      language: 'JavaScript',
      content: '',
    },
    {
      codeId: 1,
      language: 'HTML',
      content: '<h1>예시 코드</h1>',
    },
    {
      codeId: 2,
      language: 'CSS',
      content: `h1 {
	color: green
}`,
    },
  ],
});

export interface ArticleObject {
  title: string;
  content: string | null;
}

export const articleState = atom<ArticleObject>({
  key: 'articleState',
  default: {
    title: '알갱이 쏟아지는 효과 간단한 구현',
    content:
      '쉬는 날에 심심해서 구현해봤습니다 ㅎㅎ 여기에 색깔 조합만 잘 넣으시면 완성될 것 같네요 ㅎㅎ',
  },
});

export interface LeafObject {
  leaf_id: number;
  nickname: string;
  title: string;
  step: number;
  ref_order: number;
  parentLeafId: number;
  exportCnt: number;
  likeCnt: number;
}

export const LeafState = atom<LeafObject[]>({
  key: 'LeafState',
  default: [
    {
      leaf_id: 6,
      nickname: '태형',
      title: '헬로우',
      step: 1,
      ref_order: 0,
      parentLeafId: 2,
      exportCnt: 6,
      likeCnt: 5,
    },
  ],
});
