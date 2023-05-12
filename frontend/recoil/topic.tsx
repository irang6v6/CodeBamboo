import { mainTopicListInF } from '@/components/topic/TopicInterface';
import { atom } from 'recoil';
import { TopicItemInF } from '../components/topic/TopicInterface';

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
  content: string;
  step: number;
  ref_order: number;
  parent_leaf_id: number;
  exportCnt: number;
  likeCnt: number;
  type: number;
  is_root: boolean;
  codes: CodeObject[];
  user_id: number;
}

export const LeafState = atom<LeafObject[]>({
  key: 'LeafState',
  default: [
    {
      leaf_id: 6,
      user_id: 7,
      nickname: '태형',
      title: '헬로우',
      content: '마이네임',
      step: 1,
      ref_order: 0,
      parent_leaf_id: 2,
      exportCnt: 6,
      likeCnt: 5,
      type: 1,
      is_root: true,
      codes: [],
    },
  ],
});

export interface selectedObject {
  leaf_id: number;
  user_id: number;
}

export const selectedLeafState = atom<selectedObject>({
  key: 'selectedLeafState',
  default: {
    user_id: 999,
    leaf_id: 999,
  },
});

export const mainTopicListState = atom<mainTopicListInF>({
  key: 'mainTopicListState',
  default: {
    popular: [],
    trending: [],
  },
});
